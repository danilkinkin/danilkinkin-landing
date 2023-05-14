import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Header from "@/components/Header";
import Container from "@/components/Container";
import styles from "./Contacts.module.scss";
import Link from "next/link";
import MailIcon from "@/icons/Mail";
import LogoIcon from "@/icons/Logo";
import ExternalOpenIcon from "@/icons/ExternalOpen";

function LinkService({ href, name }) {
  return (
    <li>
      <Link className={styles.link} target="_blank" href={href}>
        {name}
        <ExternalOpenIcon />
      </Link>
    </li>
  );
}

function ContactsPage() {
  const router = useRouter();
  const [path, setPath] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
    const handleRouteChange = (url /* , { shallow } */) => {
      if (url === "/") {
        document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else if (url === "/contacts") {
        // contacts block
      } else {
        router.replace("/");
        return;
      }

      setPath(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <Container gap="100px" align="left" className={styles.page}>
      <div className={styles.homeLinkWrapper}>
        <Link className={styles.homeLink} href="/">
          <LogoIcon />
          danilkinkin
        </Link>
      </div>
      <div className={styles.contacts}>
        <div className={styles.column}>
          <span className={styles.caption}>
            If you would like to contact me about a job, or have any suggestion
            for my project, please select an email
          </span>
          <Link className={styles.email} href="mailto:hello@danilkinkin.com">
            <MailIcon />
            hello@danilkinkin.com
          </Link>
        </div>
        <div className={styles.column}>
          <span className={clsx(styles.caption, styles.divider)}>
            Also you can find me here
          </span>
          <nav className={styles.linksWrapper}>
            <section>
              <ul>
                <LinkService
                  name="github"
                  href="https://github.com/danilkinkin"
                />
                <LinkService name="telegram" href="https://t.me/danilkinkin" />
                <LinkService
                  name="linkedin"
                  href="https://www.linkedin.com/in/danilkinkin/"
                />
              </ul>
            </section>
            <section>
              <ul>
                <LinkService
                  name="unsplash"
                  href="https://unsplash.com/@danilkinkin"
                />
                <LinkService
                  name="instagram"
                  href="https://www.instagram.com/danilkinkin/"
                />
                <LinkService
                  name="habr"
                  href="https://habr.com/ru/users/danilkinkin/"
                />
              </ul>
            </section>
          </nav>
        </div>
      </div>
    </Container>
  );
}

export default ContactsPage;
