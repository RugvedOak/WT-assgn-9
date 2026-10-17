export type MockUser = {
  name: string;
  username: string;
  email: string;
  address: { street: string; suite: string; city: string; zipcode: string };
  company: { name: string; catchPhrase: string };
  website: string;
};

export async function getMockUser(): Promise<MockUser> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not load user (${response.status})`);
  return response.json() as Promise<MockUser>;
}