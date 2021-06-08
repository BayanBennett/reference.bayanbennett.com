import {
  Box,
  BoxProps,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@material-ui/core";
import { IconJavaScript } from "./icons/javascript";
import React, { VoidFunctionComponent } from "react";
import { RecentUpdate } from "../utils/data-path";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type RecentUpdatesProps = BoxProps & {
  recentUpdates: RecentUpdate[];
};

const UpdateCard: VoidFunctionComponent<RecentUpdate> = ({
  pathArray,
  modified,
}) => (
  <Link href={`/${pathArray.join("/")}`} passHref={true}>
    <Card
      elevation={2}
      sx={{ flex: "0 0 15rem", margin: 1, cursor: "pointer" }}
    >
      <CardHeader
        avatar={<IconJavaScript />}
        title={pathArray.join(" ")}
        subheader={dayjs(modified).fromNow()}
      />
    </Card>
  </Link>
);

export const RecentUpdates: VoidFunctionComponent<RecentUpdatesProps> = ({
  recentUpdates,
  ...boxProps
}) => (
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
