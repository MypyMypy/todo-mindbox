export const classNamesConcat = (
  ...args: (
    | string
    | number
    | undefined
    | null
    | Record<string, string | number | undefined | null | boolean>
  )[]
): string | undefined =>
  args.length
    ? args
        .filter((item) => typeof item === "number" || !!item)
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            const classNameTokens: string[] = [];
            for (const key in item) {
              if (item[key]) {
                classNameTokens.push(key);
              }
            }

            return classNameTokens.join(" ");
          }

          return String(item);
        })
        .join(" ")
        .trim()
    : undefined;
