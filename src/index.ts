import Layout from "../library/layout";
import build from "../library/build";
import { l10n } from "./l10n";

// temp location?
export const MainLayout = new Layout(["main", "header", "footer"]);

build(l10n);
