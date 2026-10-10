import { STUDIO_HTML } from "./studio-shell-v4.mjs";
import { STUDIO_JS as OLD } from "./studio-client-v6.mjs";
import { STUDIO_JS as NEW } from "./studio-client-v120.mjs";
export const RELEASE_HTML=STUDIO_HTML.replace(OLD,NEW).replace("PHIÊN BẢN 1.1.0","PHIÊN BẢN 1.2.0");
