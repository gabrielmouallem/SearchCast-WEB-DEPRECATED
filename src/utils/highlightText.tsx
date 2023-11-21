export function highlightText(
  searchText: string,
  text: string
): React.ReactNode {
  if (!searchText) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${searchText})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
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
