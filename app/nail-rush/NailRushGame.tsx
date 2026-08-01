"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./nail-rush.module.css";

const GAME_DURATION_SECONDS = 150;
const MAX_LIVES = 5;
const MAX_CLIENTS = 2;

type GameStatus = "intro" | "playing" | "ended";
type ClientOutcome = "waiting" | "correct" | "wrong";

type NailIssue = {
  problem: string;
  solution: string;
  tip: string;
};

type SalonClient = {
  id: number;
  name: string;
  issue: NailIssue;
  options: string[];
  arrivedAt: number;
  deadline: number;
  avatar: number;
  outcome: ClientOutcome;
};

type Feedback = {
  id: number;
  kind: "correct" | "wrong";
  title: string;
  detail: string;
};

const ISSUES: NailIssue[] = [
  {
    problem: "Broken nail",
    solution: "Repair",
    tip: "Stabilize the nail and repair it only when the plate is safe.",
  },
  {
    problem: "Lifted gel",
    solution: "Remove",
    tip: "Remove every lifted pocket before applying fresh product.",
  },
  {
    problem: "Wrong shape",
    solution: "File",
    tip: "Rebalance the sidewalls and free edge with controlled filing.",
  },
  {
    problem: "Thick apex",
    solution: "File",
    tip: "Refine excess bulk while preserving a balanced structure.",
  },
  {
    problem: "Damaged cuticle",
    solution: "Pause & care",
    tip: "Stop the service, clean the area and protect the skin.",
  },
  {
    problem: "Chipped polish",
    solution: "Repair",
    tip: "Repair the affected finish and reseal the free edge.",
  },
  {
    problem: "Allergic reaction",
    solution: "Refer to doctor",
    tip: "Stop the service. A medical reaction needs professional care.",
  },
  {
    problem: "Client is late",
    solution: "Reschedule",
    tip: "Protect the schedule when there is not enough time for safe work.",
  },
  {
    problem: "Impossible design",
    solution: "Offer alternative",
    tip: "Set a clear expectation and suggest a design that can be executed well.",
  },
  {
    problem: "Weak natural nails",
    solution: "Builder Gel",
    tip: "Use an appropriate structured overlay after checking nail health.",
  },
  {
    problem: "Three-week growth",
    solution: "Refill",
    tip: "Rebalance the structure and refresh the grown-out product.",
  },
];

const CLIENT_NAMES = [
  "Mia",
  "Sofia",
  "Emma",
  "Olivia",
  "Ava",
  "Luna",
  "Chloe",
  "Nora",
  "Zoe",
  "Maya",
];

const SOLUTIONS = Array.from(new Set(ISSUES.map(({ solution }) => solution)));

const TIERS = [
  { label: "Bronze", stars: 2, minimum: 0 },
  { label: "Silver", stars: 3, minimum: 1200 },
  { label: "Gold", stars: 4, minimum: 2600 },
  { label: "Nail Master", stars: 5, minimum: 4000 },
] as const;

function shuffle<T>(items: readonly T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [
      shuffled[target],
      shuffled[index],
    ];
  }

  return shuffled;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function getTier(score: number) {
  for (let index = TIERS.length - 1; index >= 0; index -= 1) {
    if (score >= TIERS[index].minimum) return TIERS[index];
  }

  return TIERS[0];
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? (
        <path d="m17 9 4 6M21 9l-4 6" />
      ) : (
        <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />
      )}
    </svg>
  );
}

function ClientAvatar({
  variant,
  outcome,
}: {
  variant: number;
  outcome: ClientOutcome;
}) {
  return (
    <span
      className={`${styles.avatar} ${styles[`avatar${variant}`]}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80">
        <path className={styles.avatarHair} d="M18 39c0-19 9-29 23-29 15 0 24 11 23 30l-7 5H25l-7-6Z" />
        <path className={styles.avatarFace} d="M25 34c0-13 6-20 16-20 11 0 17 8 17 21v10c0 12-7 21-17 21-9 0-16-9-16-21V34Z" />
        <path className={styles.avatarHair} d="M23 35c8-1 18-6 24-14 3 7 7 11 13 14l-2-14-13-9-15 4-7 19Z" />
        <path className={styles.avatarEye} d="M31 40h5M47 40h5" />
        {outcome === "correct" ? (
          <path className={styles.avatarMouth} d="M34 50c4 5 10 5 14 0" />
        ) : outcome === "wrong" ? (
          <path className={styles.avatarMouth} d="M34 55c4-5 10-5 14 0" />
        ) : (
          <path className={styles.avatarMouth} d="M36 52h10" />
        )}
      </svg>
    </span>
  );
}

function ClientCard({
  client,
  active,
  now,
}: {
  client: SalonClient;
  active: boolean;
  now: number;
}) {
  const total = client.deadline - client.arrivedAt;
  const remaining = Math.max(0, client.deadline - now);
  const progress = Math.max(0, Math.min(100, (remaining / total) * 100));
  const cardClass = [
    styles.clientCard,
    active ? styles.activeClient : "",
    client.outcome === "correct" ? styles.correctClient : "",
    client.outcome === "wrong" ? styles.wrongClient : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass} aria-current={active ? "true" : undefined}>
      <div className={styles.clientTopline}>
        <span>{active ? "YOUR CLIENT" : "WAITING"}</span>
        <span>{Math.max(0, Math.ceil(remaining / 1000))}s</span>
      </div>
      <div className={styles.clientIdentity}>
        <ClientAvatar variant={client.avatar} outcome={client.outcome} />
        <div>
          <strong>{client.name}</strong>
          <span>walk-in client</span>
        </div>
      </div>
      <p className={styles.clientProblem}>{client.issue.problem}</p>
      <div className={styles.clientTimer} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      {client.outcome !== "waiting" ? (
        <span className={styles.clientReaction}>
          {client.outcome === "correct" ? "Happy client · +100" : "Not happy · −1 life"}
        </span>
      ) : null}
    </article>
  );
}

function EmptyClientCard() {
  return (
    <div className={styles.emptyClient} aria-hidden="true">
      <span className={styles.emptyAvatar} />
      <span>Next client arriving…</span>
    </div>
  );
}

export default function NailRushGame() {
  const [status, setStatus] = useState<GameStatus>("intro");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [clients, setClients] = useState<SalonClient[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [clock, setClock] = useState(() => Date.now());
  const [gameEndsAt, setGameEndsAt] = useState(0);

  const gameStartedAtRef = useRef(0);
  const clientSequenceRef = useRef(0);
  const feedbackSequenceRef = useRef(0);
  const lastIssueRef = useRef(-1);
  const answeringIdsRef = useRef(new Set<number>());
  const removalTimersRef = useRef(new Set<number>());
  const gameOverTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundOnRef = useRef(true);
  const livesRef = useRef(MAX_LIVES);

  const createClient = useCallback((level: number, now = Date.now()) => {
    let issueIndex = Math.floor(Math.random() * ISSUES.length);

    if (issueIndex === lastIssueRef.current) {
      issueIndex = (issueIndex + 1) % ISSUES.length;
    }

    lastIssueRef.current = issueIndex;
    clientSequenceRef.current += 1;
    const issue = ISSUES[issueIndex];
    const distractors = shuffle(
      SOLUTIONS.filter((solution) => solution !== issue.solution),
    ).slice(0, 3);
    const responseSeconds = Math.max(4.1, 8 - level * 0.55);

    return {
      id: clientSequenceRef.current,
      name: CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)],
      issue,
      options: shuffle([issue.solution, ...distractors]),
      arrivedAt: now,
      deadline: now + responseSeconds * 1000,
      avatar: Math.floor(Math.random() * 6),
      outcome: "waiting" as const,
    };
  }, []);

  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (audioContextRef.current.state === "suspended") {
      void audioContextRef.current.resume();
    }
  }, []);

  const playSound = useCallback((correct: boolean) => {
    if (!soundOnRef.current) return;

    const context = audioContextRef.current;
    if (!context) return;

    const playTone = (
      frequency: number,
      delay: number,
      duration: number,
      type: OscillatorType,
    ) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startsAt = context.currentTime + delay;

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startsAt);
      gain.gain.setValueAtTime(0.0001, startsAt);
      gain.gain.exponentialRampToValueAtTime(0.08, startsAt + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startsAt);
      oscillator.stop(startsAt + duration + 0.02);
    };

    if (correct) {
      playTone(523.25, 0, 0.14, "sine");
      playTone(659.25, 0.1, 0.16, "sine");
    } else {
      playTone(196, 0, 0.19, "triangle");
    }
  }, []);

  const clearRemovalTimers = useCallback(() => {
    removalTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    removalTimersRef.current.clear();
    answeringIdsRef.current.clear();

    if (gameOverTimerRef.current !== null) {
      window.clearTimeout(gameOverTimerRef.current);
      gameOverTimerRef.current = null;
    }
  }, []);

  const removeClientSoon = useCallback((clientId: number) => {
    const timer = window.setTimeout(() => {
      setClients((current) =>
        current.filter((client) => client.id !== clientId),
      );
      answeringIdsRef.current.delete(clientId);
      removalTimersRef.current.delete(timer);
    }, 560);

    removalTimersRef.current.add(timer);
  }, []);

  const finishGame = useCallback(() => {
    setStatus("ended");
    setClients([]);
    setFeedback(null);
    clearRemovalTimers();
  }, [clearRemovalTimers]);

  const startGame = useCallback(() => {
    clearRemovalTimers();
    initializeAudio();
    const now = Date.now();

    gameStartedAtRef.current = now;
    const endsAt = now + GAME_DURATION_SECONDS * 1000;
    livesRef.current = MAX_LIVES;
    lastIssueRef.current = -1;
    setClock(now);
    setGameEndsAt(endsAt);
    setScore(0);
    setLives(MAX_LIVES);
    setFeedback(null);
    setClients([createClient(0, now)]);
    setStatus("playing");
  }, [clearRemovalTimers, createClient, initializeAudio]);

  const addClientWave = useCallback(() => {
    const now = Date.now();
    const elapsed = Math.max(0, now - gameStartedAtRef.current);
    const level = Math.min(7, Math.floor(elapsed / 20000));

    setClients((current) => {
      const availableSlots = MAX_CLIENTS - current.length;
      if (availableSlots <= 0) return current;

      const doubleChance = Math.min(0.42, 0.12 + level * 0.045);
      const waveSize =
        level >= 2 && availableSlots >= 2 && Math.random() < doubleChance
          ? 2
          : 1;
      const arrivals = Array.from(
        { length: Math.min(waveSize, availableSlots) },
        () => createClient(level, now),
      );

      return [...current, ...arrivals];
    });
  }, [createClient]);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    return () => {
      clearRemovalTimers();
      void audioContextRef.current?.close();
    };
  }, [clearRemovalTimers]);

  useEffect(() => {
    if (status !== "playing") return;

    const clockTimer = window.setInterval(() => {
      const now = Date.now();

      if (now >= gameEndsAt) {
        window.clearInterval(clockTimer);
        setClock(gameEndsAt);
        finishGame();
        return;
      }

      setClock(now);
    }, 100);

    return () => window.clearInterval(clockTimer);
  }, [finishGame, gameEndsAt, status]);

  useEffect(() => {
    if (status !== "playing") return;

    let spawnTimer = 0;
    let cancelled = false;

    const scheduleNextWave = () => {
      const elapsed = Math.max(0, Date.now() - gameStartedAtRef.current);
      const level = Math.min(7, Math.floor(elapsed / 20000));
      const delay = Math.max(1080, 2700 - level * 230);

      spawnTimer = window.setTimeout(() => {
        if (cancelled) return;
        addClientWave();
        scheduleNextWave();
      }, delay);
    };

    scheduleNextWave();

    return () => {
      cancelled = true;
      window.clearTimeout(spawnTimer);
    };
  }, [addClientWave, status]);

  useEffect(() => {
    if (
      status !== "playing" ||
      clients.length === 0 ||
      clock >= gameEndsAt
    ) {
      return;
    }

    const expired = clients.filter(
      (client) =>
        client.outcome === "waiting" &&
        client.deadline <= clock &&
        !answeringIdsRef.current.has(client.id),
    );

    if (expired.length === 0) return;

    expired.forEach((client) => answeringIdsRef.current.add(client.id));
    const expiredIds = new Set(expired.map(({ id }) => id));

    setClients((current) =>
      current.map((client) =>
        expiredIds.has(client.id)
          ? { ...client, outcome: "wrong" as const }
          : client,
      ),
    );
    const nextLives = Math.max(0, livesRef.current - expired.length);
    livesRef.current = nextLives;
    setLives(nextLives);
    feedbackSequenceRef.current += 1;
    setFeedback({
      id: feedbackSequenceRef.current,
      kind: "wrong",
      title: expired.length > 1 ? "Two clients left" : "Time ran out",
      detail: `Best response: ${expired[0].issue.solution}`,
    });
    playSound(false);
    expired.forEach(({ id }) => removeClientSoon(id));

    if (nextLives === 0 && gameOverTimerRef.current === null) {
      gameOverTimerRef.current = window.setTimeout(finishGame, 560);
    }
  }, [clients, clock, finishGame, gameEndsAt, playSound, removeClientSoon, status]);

  const activeClient = clients.find(
    (client) => client.outcome === "waiting",
  );
  const secondsLeft =
    status === "playing"
      ? Math.max(0, Math.ceil((gameEndsAt - clock) / 1000))
      : status === "intro"
        ? GAME_DURATION_SECONDS
        : 0;
  const elapsedSeconds = GAME_DURATION_SECONDS - secondsLeft;
  const level = Math.min(8, Math.floor(elapsedSeconds / 20) + 1);
  const tier = getTier(score);

  const answerClient = (choice: string) => {
    if (
      status !== "playing" ||
      !activeClient ||
      answeringIdsRef.current.has(activeClient.id)
    ) {
      return;
    }

    answeringIdsRef.current.add(activeClient.id);
    const correct = choice === activeClient.issue.solution;

    setClients((current) =>
      current.map((client) =>
        client.id === activeClient.id
          ? {
              ...client,
              outcome: correct ? "correct" : "wrong",
            }
          : client,
      ),
    );
    feedbackSequenceRef.current += 1;

    if (correct) {
      setScore((current) => current + 100);
      setFeedback({
        id: feedbackSequenceRef.current,
        kind: "correct",
        title: "Perfect decision · +100",
        detail: activeClient.issue.tip,
      });
    } else {
      const nextLives = Math.max(0, livesRef.current - 1);
      livesRef.current = nextLives;
      setLives(nextLives);
      setFeedback({
        id: feedbackSequenceRef.current,
        kind: "wrong",
        title: "Not this time · −1 life",
        detail: `Best response: ${activeClient.issue.solution}`,
      });

      if (nextLives === 0 && gameOverTimerRef.current === null) {
        gameOverTimerRef.current = window.setTimeout(finishGame, 560);
      }
    }

    playSound(correct);
    removeClientSoon(activeClient.id);
  };

  const toggleSound = () => {
    const nextValue = !soundOnRef.current;
    soundOnRef.current = nextValue;
    setSoundOn(nextValue);
    if (nextValue) initializeAudio();
  };

  const rootStyle = {
    "--rush-progress": `${Math.max(0, (secondsLeft / GAME_DURATION_SECONDS) * 100)}%`,
  } as CSSProperties;

  return (
    <main className={styles.shell} style={rootStyle}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Nail Coach AI home">
          <span className={styles.brandScript}>Nail Coach AI</span>
          <span className={styles.brandByline}>BY IRINA KLAPSHA</span>
        </Link>
        <span className={styles.experimentBadge}>EXPERIMENTAL GAME</span>
        <div className={styles.headerActions}>
          <button
            className={styles.soundButton}
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Mute game sounds" : "Turn game sounds on"}
            aria-pressed={!soundOn}
          >
            <SoundIcon muted={!soundOn} />
            <span>{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
          <Link className={styles.exitButton} href="/">
            Exit
          </Link>
        </div>
      </header>

      {status === "intro" ? (
        <section className={styles.introScreen} aria-labelledby="game-title">
          <div className={styles.introCopy}>
            <p className={styles.kicker}>THE SALON IS FULL. READY?</p>
            <h1 id="game-title">
              Nail Rush
              <span>Save the Salon</span>
            </h1>
            <p className={styles.introText}>
              You are the new nail artist on a very busy day. Make the safest
              call before each client runs out of patience.
            </p>
            <div className={styles.introActions}>
              <button className={styles.startButton} type="button" onClick={startGame}>
                Start the Rush
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 7 6-7 6V6Z" />
                </svg>
              </button>
              <span>2:30 min · 5 lives · +100 per client</span>
            </div>
          </div>

          <div className={styles.howToPlay} aria-label="How to play">
            <p>HOW TO PLAY</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Read the problem</strong>
                  <small>Clients arrive one after another.</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Choose the best action</strong>
                  <small>Tap fast, but keep the service safe.</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Survive the rush</strong>
                  <small>Every 20 seconds the salon gets busier.</small>
                </div>
              </li>
            </ol>
          </div>
        </section>
      ) : null}

      {status === "playing" ? (
        <section className={styles.playScreen} aria-label="Nail Rush game">
          <div className={styles.hud}>
            <div className={styles.hudItem}>
              <span>Score</span>
              <strong>{score.toLocaleString("en-US")}</strong>
            </div>
            <div className={styles.hudItem}>
              <span>Time</span>
              <strong>{formatTime(secondsLeft)}</strong>
            </div>
            <div className={styles.hudItem}>
              <span>Rush level</span>
              <strong>{level}</strong>
            </div>
            <div className={`${styles.hudItem} ${styles.livesItem}`}>
              <span>Lives</span>
              <div className={styles.lives} aria-label={`${lives} lives left`}>
                {Array.from({ length: MAX_LIVES }, (_, index) => (
                  <i className={index < lives ? styles.lifeActive : ""} key={index} />
                ))}
              </div>
            </div>
            <div className={styles.gameProgress} aria-hidden="true">
              <span />
            </div>
          </div>

          <div className={styles.gameBoard}>
            <section className={styles.queuePanel} aria-label="Salon clients">
              <div className={styles.panelHeading}>
                <div>
                  <span>CLIENT QUEUE</span>
                  <strong>{clients.length > 1 ? "Double booking!" : "Front desk"}</strong>
                </div>
                <span className={styles.openBadge}>OPEN</span>
              </div>
              <div className={styles.clientQueue}>
                {clients.map((client) => (
                  <ClientCard
                    client={client}
                    active={client.id === activeClient?.id}
                    now={clock}
                    key={client.id}
                  />
                ))}
                {Array.from(
                  { length: Math.max(0, MAX_CLIENTS - clients.length) },
                  (_, index) => <EmptyClientCard key={`empty-${index}`} />,
                )}
              </div>
              <div className={styles.levelTrack} aria-label={`Rush level ${level} of 8`}>
                {Array.from({ length: 8 }, (_, index) => (
                  <span className={index < level ? styles.levelActive : ""} key={index} />
                ))}
              </div>
            </section>

            <section className={styles.decisionPanel} aria-label="Choose a solution">
              <div className={styles.decisionHeading}>
                <span>YOUR DECISION</span>
                <small>{activeClient ? `Client: ${activeClient.name}` : "Stand by"}</small>
              </div>
              {activeClient ? (
                <>
                  <p className={styles.activeProblem}>{activeClient.issue.problem}</p>
                  <p className={styles.decisionPrompt}>What should you do?</p>
                  <div className={styles.choiceGrid}>
                    {activeClient.options.map((option) => (
                      <button
                        className={styles.choiceButton}
                        type="button"
                        onClick={() => answerClient(option)}
                        key={`${activeClient.id}-${option}`}
                      >
                        <span>{option}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="m9 6 6 6-6 6" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.waitingMessage}>
                  <span />
                  <strong>Next client is walking in…</strong>
                  <small>Keep your tools ready.</small>
                </div>
              )}

              <div
                className={`${styles.feedback} ${
                  feedback?.kind === "correct"
                    ? styles.feedbackCorrect
                    : feedback
                      ? styles.feedbackWrong
                      : ""
                }`}
                aria-live="polite"
                key={feedback?.id ?? 0}
              >
                {feedback ? (
                  <>
                    <strong>{feedback.title}</strong>
                    <span>{feedback.detail}</span>
                  </>
                ) : (
                  <span>Good decisions keep clients safe and happy.</span>
                )}
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {status === "ended" ? (
        <section className={styles.resultsScreen} aria-labelledby="result-title">
          <p className={styles.kicker}>SALON CLOSED · GREAT SHIFT</p>
          <div className={styles.resultStars} aria-label={`${tier.stars} stars`}>
            {Array.from({ length: tier.stars }, (_, index) => (
              <span key={index}>★</span>
            ))}
          </div>
          <h1 id="result-title">{tier.label}</h1>
          <div className={styles.scoreCard}>
            <span>Your Score</span>
            <strong>{score.toLocaleString("en-US")}</strong>
            <small>
              {Math.floor(score / 100)} {score === 100 ? "client" : "clients"} helped
            </small>
          </div>
          <div className={styles.tierList} aria-label="Score levels">
            {TIERS.map((item) => (
              <div
                className={item.label === tier.label ? styles.currentTier : ""}
                key={item.label}
              >
                <span>{"★".repeat(item.stars)}</span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
          <div className={styles.resultActions}>
            <button className={styles.startButton} type="button" onClick={startGame}>
              Play Again
            </button>
            <Link className={styles.homeButton} href="/">
              Back to Nail Coach
            </Link>
          </div>
        </section>
      ) : null}

      <footer className={styles.footer}>
        Runs entirely in your browser · No account or data storage
      </footer>
    </main>
  );
}
