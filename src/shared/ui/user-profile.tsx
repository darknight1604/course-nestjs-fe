import { useAtomValue } from "jotai";
import { authAtom } from "../atoms";
import { Typography } from "@mui/material";

const UserProfile = () => {
  const auth = useAtomValue(authAtom);
  if (!auth) {
    return <></>;
  }
  return (
    <Typography>
      <Typography
        component="span"
        display="inline"
        variant="body1"
        color="grey"
      >
        Welcome{" "}
      </Typography>
      <Typography component="span" display="inline" variant="h5">
        {auth.username}
      </Typography>
    </Typography>
  );
};

export default UserProfile;
