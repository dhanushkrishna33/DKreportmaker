export interface RepoInfo {
  owner: string;
  repo: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  topics: string[];
  readmeContent?: string;
  dependencies?: Record<string, string>;
  filesList: string[];
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  if (!url || url.trim().toLowerCase() === 'no link' || url.trim().toLowerCase() === 'no') {
    return null;
  }

  const clean = url.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/\.git$/i, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1] };
  }
  return null;
}

export async function fetchGitHubRepoData(url: string): Promise<RepoInfo | null> {
  const parsed = parseGitHubUrl(url);
  if (!parsed) return null;

  const { owner, repo } = parsed;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status} for ${owner}/${repo}`);
      return {
        owner,
        repo,
        name: repo,
        fullName: `${owner}/${repo}`,
        description: '',
        language: '',
        topics: [],
        filesList: [],
      };
    }

    const data = await res.json();

    // Fetch README if possible
    let readmeContent = '';
    try {
      const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${data.default_branch || 'main'}/README.md`);
      if (readmeRes.ok) {
        readmeContent = await readmeRes.text();
      }
    } catch {
      // ignore
    }

    // Fetch package.json if possible
    let dependencies: Record<string, string> | undefined;
    try {
      const pkgRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${data.default_branch || 'main'}/package.json`);
      if (pkgRes.ok) {
        const pkgData = await pkgRes.json();
        dependencies = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };
      }
    } catch {
      // ignore
    }

    // Fetch file tree
    let filesList: string[] = [];
    try {
      const contentsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
      if (contentsRes.ok) {
        const contents = await contentsRes.json();
        if (Array.isArray(contents)) {
          filesList = contents.map((c: { name: string }) => c.name);
        }
      }
    } catch {
      // ignore
    }

    return {
      owner,
      repo,
      name: data.name,
      fullName: data.full_name,
      description: data.description || '',
      language: data.language || '',
      topics: data.topics || [],
      readmeContent,
      dependencies,
      filesList,
    };
  } catch (err) {
    console.error('Failed to fetch github data:', err);
    return {
      owner,
      repo,
      name: repo,
      fullName: `${owner}/${repo}`,
      description: '',
      language: '',
      topics: [],
      filesList: [],
    };
  }
}
