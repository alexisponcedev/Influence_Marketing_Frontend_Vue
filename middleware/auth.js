import { LockPageStore } from "@/store";

function logout(redirect) {
    localStorage.removeItem("profile");
    localStorage.removeItem("access_token");
    localStorage.removeItem("active_brand");
    localStorage.removeItem("active_brand_id");
    goToAuth(redirect);
}

function goToAuth(redirect) {
    redirect("/Auth");
}

export default function authMiddleware({ redirect, route }) {
    if (!route.path.includes("page-builder")) LockPageStore.stop();
    const access_token = localStorage.getItem("access_token");
    if (!access_token) logout(redirect);
}

export { logout, goToAuth };
