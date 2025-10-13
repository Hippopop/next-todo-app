import { ROUTES } from "@/lib/constants/paths";
import { STRINGS } from "@/lib/constants/strings";

import AppLogo from "./AppLogo";

export default function TopNavigationBar() {
    return (
        <div className="fixed top-0 left-0 w-full z-10 flex justify-center gap-2 md:justify-start p-3 md:p-5">
            <a href={ROUTES.HOME} className="flex items-center gap-2 font-medium">
                <AppLogo />
                {STRINGS.APP_NAME}.
            </a>
        </div>
    );
}