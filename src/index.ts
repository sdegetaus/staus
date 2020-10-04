import Layout from "../library/layout";
import Staus from "../library";
import { l10n } from "./l10n";

// temp location?
export const MainLayout = new Layout(["main", "header", "footer"]);

Staus.build(l10n);
