import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

//calculer la différence de temps entre le temps du serveur et le temps du client 
const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
  const server = serverTime.getTime();
  const client = clientTime.getTime();

  const timeDiff = Math.abs(server - client);
  const days = Math.floor(timeDiff/(1000*60*60*24));
  const hours = Math.floor((timeDiff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((timeDiff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((timeDiff % (1000*60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

};


export default function Home() {
  const router = useRouter();
  const [serverTime, setServerTime] = useState <Date | null>(null);
  const [clientTime, setClientTime] = useState(new Date());

  useEffect(() => {
    //récupérer le temps du serveur
    const fetchServerTime = async()=>{
      const estimatedServerTime = new Date();

      setServerTime(estimatedServerTime);
    };
    fetchServerTime();
  }, []);

 

  const moveToTaskManager = () => {
    router.push("/tasks");
  }


  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <h1>The easiest exam you will ever find</h1>
        <div>
          {serverTime && (
            <>
              <p>
                Server time:{" "}
                <span className="serverTime">
                  {(serverTime as Date).toLocaleString()}
                </span>
              </p>
              <p>
                Time diff:{" "}
                <span className="serverTime">
                  { calculateTimeDifference(serverTime as Date, clientTime)}
                </span>
              </p>
            </>
          )}
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
