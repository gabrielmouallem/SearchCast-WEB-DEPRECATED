export function highlightText(
  searchText: string,
  text: string
): React.ReactNode {
  if (!searchText) {
    return <>{text}</>;
  }

  // Split the search text into an array of words
  const searchWords = searchText.split(/\s+/);

  // Create a regular expression to match any of the search words
  const searchRegex = new RegExp(`(${searchWords.join("|")})`, "gi");

  // Split the text into parts using the searchRegex
  const parts = text.split(searchRegex);

  return (
    <>
      {parts.map((part, i) =>
        // Check if the part matches any of the search words
        searchWords.some(
          (word) => part.toLowerCase() === word.toLowerCase()
        ) ? (
          <span key={i} style={{ backgroundColor: "blue" }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
