import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

const post = blogPosts.find((p) => p.slug === "why-ai-pipelines-need-workflow-level-observability")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}/` },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    publishedTime: post.date,
  },
};

export default function BlogPostPage() {
  return (
    <article>
      <div className="border-b border-border py-14">
        <Container className="max-w-3xl">
          <Link href="/blog" className="text-sm font-medium text-brand-violet hover:underline">
            &larr; Back to blog
          </Link>
          <time className="mt-6 block text-xs font-medium uppercase tracking-wide text-muted">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        </Container>
      </div>

      <Container className="max-w-3xl py-14">
        <div className="prose-content max-w-none space-y-5 text-[15px] leading-7 text-foreground/90">
          <p>
            Your API is returning 200s. Latency is nominal. CPU is fine. Uptime is 99.9%.
          </p>
          <p>
            And your RAG pipeline is still hallucinating, because the retriever quietly started returning
            irrelevant chunks three days ago, and nothing in your monitoring stack noticed — because nothing
            was watching for it.
          </p>
          <p>
            This is the blind spot most teams hit the first time they put an LLM pipeline into production: the
            tools that tell you a system is <em>up</em> have almost nothing to say about whether it&apos;s{" "}
            <em>right</em>. AI pipelines fail differently than traditional web services, and they need a
            different layer of observability to match — one that looks inside the workflow, not just around
            it.
          </p>
          <p>
            We ran into this building{" "}
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-violet hover:underline">
              Aktilot
            </a>
            , an open-source RAG platform, and ended up instrumenting every stage of the pipeline with
            OpenTelemetry rather than just the API boundary. This post is about why request-level monitoring
            isn&apos;t enough for AI systems, and what workflow-level observability actually looks like in
            practice.
          </p>

          <h2 className="!mt-10 text-xl font-bold tracking-tight">
            The problem: a healthy request can still be a wrong answer
          </h2>
          <p>
            A typical RAG chat request in Aktilot isn&apos;t one operation — it&apos;s a workflow made of seven
            distinct steps, orchestrated by Temporal: retrieve candidates, score them with BM25, blend and
            rerank, build a prompt, call the LLM, and so on. A dashboard that only tracks the HTTP request
            boundary sees exactly one thing: &ldquo;the request completed in 1.2 seconds and returned
            200.&rdquo; It has no idea which of those seven internal steps did the work, which one was slow, or
            whether the <em>content</em> flowing through the pipeline was any good.
          </p>
          <p>
            That&apos;s the core failure mode of request-level monitoring applied to AI systems: it collapses a
            multi-stage pipeline into a single pass/fail bit. Traditional APM was built for that model — a
            request comes in, a handful of DB calls happen, a response goes out, and if it&apos;s slow you
            profile the query. AI pipelines break that model because:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Failure isn&apos;t binary.</strong> A bad answer isn&apos;t an exception. Nothing throws
              when the retriever returns mediocre chunks — the pipeline happily generates a confident, wrong
              answer and returns 200.
            </li>
            <li>
              <strong>The pipeline has more stages, and each one can degrade independently.</strong> Retrieval
              quality, reranking, prompt assembly, and generation are separate concerns with separate failure
              modes.
            </li>
            <li>
              <strong>Cost and latency are workflow properties, not request properties.</strong> A slow request
              could mean a slow LLM call, or it could mean the request sat in a worker queue for two seconds
              before anyone even started working on it — and those require completely different fixes.
            </li>
          </ul>
          <p>
            Workflow-level observability means instrumenting each stage of the pipeline as a first-class
            citizen, so you can answer &ldquo;which step, exactly, is the problem&rdquo; instead of just
            &ldquo;was the request slow.&rdquo;
          </p>

          <h2 className="!mt-10 text-xl font-bold tracking-tight">What this looks like in practice</h2>
          <p>
            We instrumented Aktilot&apos;s full pipeline — ingestion, retrieval, reranking, prompt assembly,
            LLM calls, vector DB operations, and the Temporal workflow layer itself — with OpenTelemetry,
            exported through an OTEL Collector into Prometheus (metrics) and Tempo (traces), visualized in
            Grafana. Here&apos;s what fell out of doing that properly, and why each piece matters.
          </p>

          <h3 className="!mt-8 text-lg font-semibold">1. Stage-level latency, not just request latency</h3>
          <p>
            The obvious first step is breaking total latency down by stage. Aktilot emits{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.workflow.activity_duration_ms</code>,
            labeled by activity type, specifically because workflow-level latency alone can&apos;t tell you
            whether <code className="rounded bg-surface px-1.5 py-0.5">generate_answer</code> (the LLM call) or{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">hybrid_rank</code> (BM25 + reranking) is the
            actual bottleneck. In practice, the LLM call dominates almost every time — but you only know that
            because you measured it, not because you assumed it.
          </p>
          <p>
            This sounds trivial, but it&apos;s the difference between &ldquo;the chat endpoint is slow, no idea
            why&rdquo; and &ldquo;72% of latency is one specific activity, here&apos;s the histogram.&rdquo;
          </p>

          <h3 className="!mt-8 text-lg font-semibold">2. Quality signals that are completely orthogonal to error signals</h3>
          <p>
            This is the part classic monitoring can&apos;t see at all. A retriever returning garbage
            doesn&apos;t error — it just quietly makes the whole system worse. You need metrics whose entire
            purpose is to measure <em>quality</em>, independent of whether anything crashed.
          </p>
          <p>Aktilot tracks:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code className="rounded bg-surface px-1.5 py-0.5">rag.reranker.score_top1</code> — the hybrid
              score of the best-ranked chunk returned. This is treated as the primary retrieval-quality signal.
              A top-1 score dropping below ~0.4 means retrieval isn&apos;t finding relevant content anymore —
              with zero errors thrown anywhere.
            </li>
            <li>
              <code className="rounded bg-surface px-1.5 py-0.5">rag.retrieval.score_avg</code>, split by{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">score_type</code> (vector / BM25 / hybrid) —
              lets you catch cases where the hybrid blend is <em>worse</em> than vector search alone, meaning
              BM25 is actively hurting results.
            </li>
            <li>
              <code className="rounded bg-surface px-1.5 py-0.5">rag.reranker.docs_discarded</code> — at k=20
              → top_k=6, the expected discard ratio is roughly 0.7. When that ratio drifts, it&apos;s a signal
              that the candidate pool composition changed, even though nothing &ldquo;broke.&rdquo;
            </li>
          </ul>
          <p>
            None of these are health checks. They&apos;re baselines with expected ranges, and the interesting
            alert isn&apos;t &ldquo;value is null&rdquo; — it&apos;s &ldquo;value moved away from its
            historical band.&rdquo;
          </p>

          <h3 className="!mt-8 text-lg font-semibold">3. Paired counters as a cheap correctness check</h3>
          <p>
            One of the more useful patterns we landed on: instrumenting two counters that <em>should</em> move
            in lockstep, and watching for divergence. Aktilot&apos;s chat workflow calls the LLM for two
            purposes —{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">generate_answer</code> and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">keyword_extract</code> — and under normal
            operation,{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.llm.requests_total</code> for each purpose
            should track roughly 1:1. If{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">keyword_extract</code> calls start falling
            behind <code className="rounded bg-surface px-1.5 py-0.5">generate_answer</code> calls, it means a
            workflow step is silently failing (swallowed exception, early return, whatever) without ever
            surfacing as an error metric.
          </p>
          <p>
            This is cheap to build and catches a whole category of bug that error-rate dashboards structurally
            can&apos;t — the silent partial failure.
          </p>

          <h3 className="!mt-8 text-lg font-semibold">4. Cost attribution by stage, not a monthly total</h3>
          <p>
            &ldquo;We spent $4,200 on OpenAI this month&rdquo; tells you nothing actionable. Workflow-level
            observability means attributing cost to the specific stage and reason it was incurred:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code className="rounded bg-surface px-1.5 py-0.5">rag.prompt.tokens_context</code> vs{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">tokens_system</code> vs{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">tokens_user_question</code>, tracked as a
              stacked breakdown per query. Rising context tokens means your chunking or{" "}
              <code className="rounded bg-surface px-1.5 py-0.5">top_k</code> needs tuning. Rising system
              tokens means your prompt template is bloating — and that cost compounds on <em>every single
              query</em>, so it&apos;s worth catching early.
            </li>
            <li>
              <code className="rounded bg-surface px-1.5 py-0.5">rag.tokens.embedding_total</code>, split by
              call site (ingestion vs. query time). Ingestion spend is expected to be bursty — it spikes on
              document upload. Query-time embedding spend growing steadily is a usage trend, and conflating the
              two in one aggregate number hides both signals.
            </li>
          </ul>
          <p>
            Once cost is broken down this way, &ldquo;reduce spend&rdquo; turns into a specific, actionable
            target instead of a vague budget conversation.
          </p>

          <h3 className="!mt-8 text-lg font-semibold">5. Retry and failure attribution at the activity level</h3>
          <p>
            A workflow-level &ldquo;5% failure rate&rdquo; is nearly useless when you&apos;re on call at 2am.
            What you actually need is: <em>which</em> activity, <em>which</em> dependency, and{" "}
            <em>is this something that will self-heal or does it need a human</em>.
          </p>
          <p>
            Aktilot&apos;s{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.workflow.retries_total</code> and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.workflow.activity_failures_total</code> are
            labeled per activity type, so a spike immediately tells you whether OpenAI, ChromaDB, or Postgres
            is the flaky one. The failure counter also carries a{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">non_retryable</code> label —{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">non_retryable=true</code> means it&apos;s an
            auth or config error that will keep failing until someone intervenes, versus a transient error that
            Temporal&apos;s retry policy will absorb on its own. That one label is the difference between
            paging someone and letting the system heal itself.
          </p>

          <h3 className="!mt-8 text-lg font-semibold">6. Distinguishing &ldquo;slow&rdquo; from &ldquo;backed up&rdquo;</h3>
          <p>
            Rising latency has two very different root causes: the work itself got slower, or requests are
            sitting in a queue waiting for a free worker. These require completely different fixes — optimizing
            a prompt versus scaling out workers — and request-level latency alone can&apos;t tell them apart.
          </p>
          <p>
            Because Aktilot&apos;s workflow layer runs on Temporal, this distinction comes almost for free:{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.workflow.queue_delay_ms</code> measures time
            between an activity being scheduled and a worker actually picking it up, while{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">rag.workflow.activity_duration_ms</code>{" "}
            measures actual execution time. Add{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">temporal_worker_task_slots_available</code>{" "}
            (visibility into worker saturation) and you can tell at a glance whether you&apos;re LLM-bound or
            worker-bound — two problems that look identical from the outside but have opposite fixes.
          </p>

          <h3 className="!mt-8 text-lg font-semibold">7. Traces to connect the dots on a single bad request</h3>
          <p>
            Aggregate dashboards tell you the system trend. When a specific user reports &ldquo;this answer was
            wrong,&rdquo; you need to go from that one complaint to the exact retrieval scores, token counts,
            and activity timings for <em>that specific request</em> — not just the aggregate.
          </p>
          <p>
            Every API request and workflow activity in Aktilot is traced end-to-end through Grafana Tempo,
            linking the HTTP request → workflow execution → individual activity spans. That means a support
            engineer can pull the trace ID for one user&apos;s bad answer and see precisely which chunks were
            retrieved, what their scores were, and how many tokens went into the prompt — turning &ldquo;the AI
            was wrong&rdquo; into a debuggable, specific incident.
          </p>

          <h2 className="!mt-10 text-xl font-bold tracking-tight">A framework you can apply beyond RAG</h2>
          <p>
            None of this is specific to RAG pipelines — the same reasoning applies to any multi-stage LLM
            system (agents, multi-step tool-calling pipelines, extraction workflows). The pattern generalizes
            to a short checklist:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Instrument every pipeline stage independently</strong>, not just the request boundary. If
              your workflow has N steps, you should be able to see latency and volume for each of the N, not
              just the sum.
            </li>
            <li>
              <strong>Track quality metrics as a category separate from health metrics.</strong> A 200 status
              code and a good answer are different guarantees, and only one of them is covered by traditional
              monitoring.
            </li>
            <li>
              <strong>Instrument paired counters that should move together</strong> as a cheap, free
              correctness check for silent partial failures.
            </li>
            <li>
              <strong>Attribute cost to stage and purpose</strong>, not just an aggregate bill — cost
              breakdowns should be actionable, not just informative.
            </li>
            <li>
              <strong>Label retries and failures by the specific dependency</strong>, and distinguish
              retryable from non-retryable — that&apos;s what turns a metric into an actionable page.
            </li>
            <li>
              <strong>Separate queue delay from execution time</strong> so you can tell saturation from
              slowness before you scale the wrong thing.
            </li>
            <li>
              <strong>Trace individual requests end-to-end</strong> so aggregate dashboards can be backed up
              by per-request forensics when something specific goes wrong.
            </li>
          </ol>

          <h2 className="!mt-10 text-xl font-bold tracking-tight">Closing thought</h2>
          <p>
            The uncomfortable truth about AI pipelines is that &ldquo;it&apos;s not throwing errors&rdquo; and
            &ldquo;it&apos;s working correctly&rdquo; are much further apart than they are for traditional
            software. Uptime monitoring was built for a world where correctness and availability were roughly
            the same problem. In AI pipelines, they&apos;re not — and the gap between them is exactly where
            workflow-level observability has to live.
          </p>
          <p>
            If you want to see the full instrumented stack — dashboards, metric definitions, and the
            OTel/Temporal wiring — it&apos;s all open source in{" "}
            <Link href="/docs/observability" className="font-medium text-brand-violet hover:underline">
              Aktilot&apos;s observability docs
            </Link>
            .
          </p>
        </div>
      </Container>
    </article>
  );
}
