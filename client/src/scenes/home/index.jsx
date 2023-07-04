import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import UserWidget from "scenes/widgets/UserWidget";

import MyPostWidget from "scenes/widgets/PostWidget";
import PostsWidget from "scenes/widgets/ListPostWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, image } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} image={image} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget imagePost={image} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default Home;
