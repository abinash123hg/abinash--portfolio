import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';

export const GamesApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(140);
  const [playerY, setPlayerY] = useState(0); // 0 is ground, higher is jumping
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleX, setObstacleX] = useState(300);
  const [obstacleType, setObstacleType] = useState('OOM Error');
  const [gameOver, setGameOver] = useState(false);

  const OBSTACLES = ['OOM Error', 'Hallucination', 'Data Drift', 'Gradient Explode'];

  const jump = () => {
    if (!isPlaying) {
      startGame();
      return;
    }
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setPlayerY(75);
      setTimeout(() => {
        setPlayerY(0);
        setIsJumping(false);
      }, 550);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setObstacleX(300);
    setPlayerY(0);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setObstacleX((prev) => {
        if (prev < -20) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setObstacleType(OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]);
          return 320;
        }

        // Collision Check
        // Player is around X=40, width=30. Obstacle width=30
        if (prev > 25 && prev < 65 && playerY < 40) {
          setGameOver(true);
          setIsPlaying(false);
        }

        return prev - 8;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, playerY, highScore]);

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none">
      <AppHeader title="Neural Dash" subtitle="AI Mini Game" />

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Score Board */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Score: <b className="text-emerald-400 font-mono text-sm">{score}</b></span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Best: <b className="text-amber-400 font-mono text-sm">{highScore}</b></span>
          </div>
        </div>

        {/* Game Stage */}
        <div
          onClick={jump}
          className="relative w-full h-64 rounded-3xl bg-gradient-to-b from-indigo-950 via-zinc-900 to-black border-2 border-white/10 overflow-hidden cursor-pointer flex flex-col justify-end p-4 shadow-2xl"
        >
          {/* Instructions banner when not active */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
              <Gamepad2 className="w-12 h-12 text-blue-400 mb-2" />
              <h3 className="text-base font-bold text-white">Neural Gradient Dash</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                Tap anywhere to jump over AI bugs, OOM errors, and hallucination traps!
              </p>
              <button className="mt-4 px-5 py-2 rounded-full bg-blue-600 font-bold text-xs text-white shadow-lg">
                Tap to Play
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-20">
              <h3 className="text-lg font-bold text-rose-500">Pipeline Crash!</h3>
              <p className="text-xs text-zinc-400 mt-1">Hit by: {obstacleType}</p>
              <p className="text-sm font-bold text-emerald-400 mt-2">Final Score: {score}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="mt-4 px-5 py-2 rounded-full bg-emerald-600 font-bold text-xs text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Run</span>
              </button>
            </div>
          )}

          {/* Obstacle */}
          <div
            className="absolute bottom-4 h-9 px-2 rounded-lg bg-rose-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-lg border border-rose-400"
            style={{ left: `${obstacleX}px` }}
          >
            {obstacleType}
          </div>

          {/* Player (Neural Node) */}
          <div
            className="absolute left-8 w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.8)] border border-white flex items-center justify-center text-[10px] font-black text-white transition-all duration-150"
            style={{ bottom: `${16 + playerY}px` }}
          >
            AI
          </div>

          {/* Floor Line */}
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full" />
        </div>

        {/* Tap control footer */}
        <div className="text-center">
          <button
            onClick={jump}
            className="w-full py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/30 font-bold text-xs text-blue-300"
          >
            Tap Here or Game Stage to Jump
          </button>
        </div>
      </div>
    </div>
  );
};
