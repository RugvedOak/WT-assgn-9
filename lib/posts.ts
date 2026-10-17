export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(options: { revalidate?: number } = {}): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`, {
    cache: options.revalidate ? undefined : "force-cache",
    ...(options.revalidate ? { next: { revalidate: options.revalidate } } : {}),
  });
  if (!response.ok) throw new Error(`Could not load posts (${response.status})`);
  return response.json() as Promise<Post[]>;
}

export async function getPost(id: number): Promise<Post | null> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Could not load post (${response.status})`);
  return response.json() as Promise<Post>;
}