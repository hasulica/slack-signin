import Layout from "../components/layout";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../components/header.module.css";
import { signIn, signOut, useSession } from "next-auth/client";

const BoardEditor = dynamic(
  () => import("@vestaboard/installables").then((mod) => mod.BoardEditor),
  {
    ssr: false,
  }
);

function Home(userName) {
  const sendMessage = async () => {
    let textarea = document.getElementsByTagName("textarea")[0];
    const response = await fetch(`/api/message`, {
      method: "post",
      body: JSON.stringify({
        author: userName,
        text: textarea.value,
        value: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setShowSentAlert(true);
      setTimeout(() => setShowSentAlert(false), 4000);
    } else {
    }
  };

  const textarea = useRef();
  const alert = useRef();
  const sentAlert = useRef();
  const [showSentAlert, setShowSentAlert] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(async () => {
    let importedLib = await import("@vestaboard/installables");
    const encodingFunction = importedLib.encodeBoardCharacters;
    setValue(encodingFunction(""));
  }, []);

  return (
    <div className="content">
      <BoardEditor
        style={{ width: "100%" }}
        boardValue={value}
        setBoardValue={setValue}
        onSend={() => sendMessage()}
        className="board-editor"
      ></BoardEditor>
    </div>
  );
}

export default function Page() {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Head>
        <title>Annoy Radu</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          <Home userName={""} />

          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("slack");
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.name}</strong>
              </span>
              <Home userName={session.user.name} />
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </Layout>
  );
}
