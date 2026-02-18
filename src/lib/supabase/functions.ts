type RequiredEnv = "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY";

function readEnv(name: RequiredEnv) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export async function invokeEdgeFunction<TBody extends object>(
  functionName: string,
  body: TBody,
) {
  const supabaseUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  const json = text ? (JSON.parse(text) as unknown) : {};

  if (!response.ok) {
    const message =
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof json.error === "string"
        ? json.error
        : `Edge function ${functionName} failed`;
    throw new Error(message);
  }

  return json;
}
