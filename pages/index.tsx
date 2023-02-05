import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { BibleType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import SquigglyLines from "../components/SquigglyLines";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [verse, setVerse] = useState("");
  const [bible, setBible] = useState<BibleType>("Personal");
  const [generatedVerses, setGeneratedVerses] = useState<String>("");

  const router = useRouter();
  useEffect(() => {}, []);

  const prompt = `Respected OpenAI, as a language expert, I request your help in either improving my email or writing a comprehensive and effective email that appears to be written by a human. Please ensure that the email sounds natural, engaging, and free of any robotic or artificial tone. If you are improving my email or writing a new email, please use the following message as inspiration: ${verse}. In either case, the email should be at least 100 words, clearly labeled as "1." and should be tailored to the ${bible} category. Thank you for your assistance. ${
    verse.slice(-1) === "." ? "" : "."
  }`;

  switch (bible) {
    case "Personal":
    case "Formal":
    case "Friendly":
    case "Business":
    case "Sales":
    case "Marketing":
    case "Support":
    case "Announcement":
    case "Invitation":
    case "Follow-up":
    case "Thank You":
    case "Apology":
    case "Reminder":
    case "Negotiation":
    case "Networking":
    case "Congratulatory":
    case "Feedback":
    case "Recommendation":
    case "Inquiry":
    case "Complaint":
    case "Scheduling":
    case "Promotional":
    case "Rejection":
    case "Upsell":
    case "Customer Service":
    case "Order Confirmation":
    case "Feedback Request":
    case "Cancellation":
    case "Product Information":
    case "Casual":
    case "Humorous":
    case "Sarcastic":
    case "Persuasive":
    case "Professional":
    case "Informative":
    case "Inspirational":
    case "Motivational":
    case "Empathetic":
    case "Enthusiastic":
    case "Supportive":
      break;
    default:
      throw new Error("Invalid Category");
  }

  const generateVerse = async (e: any) => {
    e.preventDefault();
    setGeneratedVerses("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      setResponse({
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get("X-Ratelimit-Limit"),
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ),
          "X-Ratelimit-Reset": response.headers.get("X-Ratelimit-Reset"),
        },
      });
      setLoading(false);
      alert(`Rate limit reached, try again after one minute.`);
      return;
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedVerses((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const isDisabled = () => {
    const trimmedVerse = verse.trim();
    if (trimmedVerse.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const limitCharacters = (e: any) => {
    if (e.target.value.length > 1500) {
      e.target.value = e.target.value.substr(0, 1500);
      toast.error("You have reached the maximum number of characters.");
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>
          Experience Effortless Email Writing with AI Assistance - BetterEmails
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="sm:mt-15 mt-12 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Experience Effortless Email Writing with{" "}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative">AI Assistance</span>
          </span>
        </h2>
        <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-slate-900">
          Say goodbye to the hassle of crafting emails. With our AI-powered
          language expertise, you can now write professional, engaging, and
          effective emails with ease. Get started today and experience the power
          of AI-assisted email writing.
        </p>
        <div className="max-w-xl w-full px-6">
          <div className="flex mt-10 items-center space-x-3">
            <span className="text-white bg-black rounded-full w-8 h-8 text-center flex items-center justify-center">
              1
            </span>
            <p className="ml-3 text-left text-base">
              Provide a short email message/inspiration.
            </p>
          </div>
          <textarea
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
            onInput={limitCharacters}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled()) {
                e.preventDefault();
                generateVerse(e);
              }
            }}
            rows={4}
            className="w-full mt-5 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
            placeholder={
              "Please provide the message or inspiration you would like the email to be based on. If you are requesting an improvement to an existing email, please paste the email in its entirety below. Ensure that the message is at least 30 words and specify the desired email category (e.g. formal, friendly, business)."
            }
          />
          <div className="flex mt-5 items-center space-x-3">
            <span className="text-white bg-black rounded-full w-8 h-8 text-center flex items-center justify-center">
              2
            </span>
            <p className="ml-3 text-left text-base">Select email category.</p>
          </div>
          <div className="block mt-3">
            <DropDown
              bible={bible}
              setBible={(newBible) => setBible(newBible)}
            />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full"
              onClick={(e) => generateVerse(e)}
              disabled={isDisabled()}
            >
              Generate Emails &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-lg text-white text-base px-4 py-2 mt-10 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedVerses && (
                <>
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mx-auto px-3">
                      Your Personalized Email Written by AI
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto px-3">
                    {generatedVerses
                      .substring(generatedVerses.indexOf("1") + 3)
                      .split(/[1-3]\./)
                      .map((generatedVerse) => {
                        const trimmedVerse = generatedVerse.trim();
                        return (
                          <div
                            className="bg-blue-100 rounded-xl shadow-md p-4 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${trimmedVerse} (generated from https://emails.betterself.app/)`
                              );
                              toast("Generated Email Copied!", {
                                icon: "✂️",
                              });
                            }}
                            key={trimmedVerse}
                          >
                            <p className="text-base leading-tight text-justify">
                              {trimmedVerse}
                            </p>
                          </div>
                        );
                      })}
                    <p className="bg-yellow-200 p-3 text-justify text-yellow-800 font-light leading-tight rounded-lg text-xs mt-2">
                      Click emails to copy. Please note that the generated
                      emails are created by an AI language model and may not
                      always produce perfect results. It is the responsibility
                      of the user to review and edit the generated emails as
                      needed before sending. BetterEmails accepts no liability
                      for any errors or omissions in the generated emails.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;