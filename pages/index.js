import Layout from "../components/layout";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const BoardEditor = dynamic(
  () => import("@vestaboard/installables").then((mod) => mod.BoardEditor),
  {
    ssr: false,
  }
);

function Home() {
  const sendMessage = async () => {
    const response = await fetch(`/api/message`, {
      method: "post",
      body: JSON.stringify(value),
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

  useEffect(async () => {}, [value]);

  return (
    <div>
      <Head>
        <title>Annoy Radu</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <main>
        <div className="content">
          <img className="header" src="header.png"></img>

          <BoardEditor
            style={{ width: "100%" }}
            boardValue={value}
            setBoardValue={setValue}
            onSend={() => sendMessage()}
            className="board-editor"
          ></BoardEditor>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
