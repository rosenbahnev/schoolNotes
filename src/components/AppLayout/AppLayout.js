import { Outlet, NavLink } from "react-router-dom";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.nav}>
                    <NavLink to="/" className={styles.headLink}>
                        Начало
                    </NavLink>
                    <NavLink className={styles.headLink} to="/list">
                        Забележки
                    </NavLink>
                    <NavLink className={styles.headLink} to="/words">
                        Думи
                    </NavLink>
                </div>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
}
