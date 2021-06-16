import {
  Box,
  BoxProps,
  Card,
  CardHeader,
  Paper,
  Typography,
} from "@material-ui/core";
import { IconJavaScript } from "./icons/javascript";
import React, { ReactElement, VoidFunctionComponent } from "react";
import { RecentUpdate } from "../utils/data-path";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { usePageProps } from "../contexts/page-props";

dayjs.extend(relativeTime);

type RecentUpdatesProps = BoxProps;

const iconMap: Record<string, ReactElement> = {
  JavaScript: <IconJavaScript />,
};

const UpdateCard: VoidFunctionComponent<RecentUpdate> = ({
  pathArray,
  modified,
  title,
}) => (
  <Link href={`/${pathArray.join("/")}`} passHref={true}>
    <Card
      elevation={2}
      sx={{ flex: "0 0 15rem", margin: 1, cursor: "pointer" }}
    >
      <CardHeader
        avatar={iconMap[pathArray[0]]}
        title={title}
        subheader={dayjs(modified).fromNow()}
      />
    </Card>
  </Link>
);

export const RecentUpdates: VoidFunctionComponent<RecentUpdatesProps> = ({
  ...boxProps
}) => {
  const { recentUpdates = [] } = usePageProps();
  return (
    <Box
      {...boxProps}
      component={Paper}
      sx={{ display: "flex", flexFlow: "column nowrap", padding: 2 }}
    >
      <Typography variant="h3">Recent Updates</Typography>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          overflowX: "scroll",
        }}
      >
        {recentUpdates.map((props) => (
          <UpdateCard key={props.pathArray.join()} {...props} />
        ))}
      </Box>
    </Box>
  );
};
