"use client";

import Link from "next/link";
import { useState } from "react";

type RecommendationResponse = {
  user_id: number;
  recommendations: number[];
  source?: string;
  reason?: string;
};

export default function RecommendationsButton() {
  const [userId, setUserId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecommendationResponse | null>(null);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/proxy/recommendations/${encodeURIComponent(userId)}`,
        { cache: "no-store" },
      );
      const payload = await res.json();

      if (!res.ok) {
        setError(payload?.error ? JSON.stringify(payload) : "Request failed");
        setData(null);
        return;
      }

      setData(payload);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const isFallback = data?.source?.startsWith("fallback");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold">
            Recommendations
          </h3>
          <p className="text-sm text-gray-500">
            Get personalized recs (or trending if cold start)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-20 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-lime-400"
            inputMode="numeric"
            placeholder="1"
            aria-label="User ID"
          />

          <button
            onClick={getRecommendations}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Loading
              </>
            ) : (
              <>Get recommendations</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {data && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500">Source:</span>
            <span
              className={
                "rounded-full px-2 py-1 text-xs font-semibold " +
                (isFallback
                  ? "bg-gray-100 text-gray-700"
                  : "bg-lime-100 text-lime-800")
              }
            >
              {data.source ?? "unknown"}
            </span>

            {data.reason && (
              <>
                <span className="text-gray-500">Reason:</span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                  {data.reason}
                </span>
              </>
            )}
          </div>

          <div className="mt-3">
            {data.recommendations?.length ? (
              <div className="flex flex-wrap gap-2">
                {data.recommendations.map((id) => (
                  <Link
                    key={id}
                    href={`/dashboard/products/${id}`}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:border-lime-300 hover:bg-lime-50"
                    title="View product"
                  >
                    #{id}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No recommendations yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
