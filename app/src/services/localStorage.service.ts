import { parseStr, stringify } from "@mv-d/toolbelt";
import { Ok } from "@sniptt/monads";

function save(key: string, data: unknown) {
  const result = stringify(data);

  if (result.isErr()) return result;

  localStorage.setItem(key, result.unwrap());

  return Ok(true);
}

function get<T>(key: string, alt: T) {
  const result = parseStr<T>(localStorage.getItem(key) || "");

  if (result.isOk()) return Ok(result.unwrap());
  else if (alt) return Ok(alt);
  else return result;
}

export const LocalStorageService = { save, get };
