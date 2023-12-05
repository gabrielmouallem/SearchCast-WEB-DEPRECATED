import { Button, Container } from "@mui/material";
import { buttonSx, containerSx } from "./LoadMoreButton.styles";

interface LoadMoreButtonProps {
  show: boolean;
  onClick: () => void;
}

export function LoadMoreButton({ show, onClick }: LoadMoreButtonProps) {
  return (
    <>
      {show && (
        <Container sx={containerSx}>
          <Button onClick={() => onClick()} variant="contained" sx={buttonSx}>
            Load more
          </Button>
        </Container>
      )}
    </>
  );
}
