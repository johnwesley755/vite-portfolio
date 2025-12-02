import React, { useEffect, useState } from "react";

type Repo = { id: number; name: string; html_url: string; pushed_at?: string; description?: string };

export const IntegrationsSection: React.FC = () => {
    const username = import.meta.env.VITE_GITHUB_USERNAME || "johnwesley755";
    const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        (async () => {
            const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=30`, { headers });
                if (!res.ok) return;
                const all: Repo[] = await res.json();
                const list = all
                    .sort((a, b) => new Date(b.pushed_at || 0).getTime() - new Date(a.pushed_at || 0).getTime())
                    .slice(0, 8);
                setRepos(list);
            } catch {}
        })();
    }, [username, token]);

    return (
        <section className="py-20 px-4 bg-black" id="integrations">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-10">GitHub Activity</h2>
                <div className="rounded-2xl border border-gray-800 p-6 bg-[linear-gradient(180deg,rgba(20,20,20,.8),rgba(10,10,10,.8))] shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-white font-semibold mb-4">Contribution Graph</h3>
                            <img
                                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&custom_title=${encodeURIComponent("John Wesley's Contribution Graph")}&bg_color=0d1117&color=4ECDC4&line=FF6B6B&point=FFD93D&area=true&hide_border=true`}
                                alt="Contribution graph"
                                className="w-full rounded-xl border border-gray-800"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <img
                                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=4ECDC4&icon_color=FF6B6B&text_color=ffffff&count_private=true`}
                                    alt="GitHub stats"
                                    className="w-full rounded-xl border border-gray-800"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <img
                                    src={`https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=github-dark-blue&hide_border=true&background=0d1117&stroke=4ECDC4&ring=FF6B6B&fire=FFD93D&currStreakLabel=4ECDC4`}
                                    alt="GitHub streak"
                                    className="w-full rounded-xl border border-gray-800"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div className="mt-4">
                                <img
                                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=4ECDC4&text_color=ffffff&langs_count=10`}
                                    alt="Most used languages"
                                    className="w-full md:w-3/4 rounded-xl border border-gray-800"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-white font-semibold mb-4">Recent Repositories</h3>
                            <ul className="space-y-3">
                                {repos.map((r) => (
                                    <li key={r.id}>
                                        <a href={r.html_url} target="_blank" rel="noreferrer" className="block rounded-xl border border-gray-800 bg-gray-950/60 hover:bg-gray-900/60 transition-colors p-4">
                                            <div className="text-emerald-400 font-semibold">{r.name}</div>
                                            <div className="text-xs text-gray-400 mt-1 line-clamp-2">{r.description || "No description"}</div>
                                        </a>
                                    </li>
                                ))}
                                {repos.length === 0 && (
                                    <li className="text-sm text-gray-400">No repositories found.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationsSection;


