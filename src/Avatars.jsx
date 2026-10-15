import React from "react";

/*
 * Two original cartoon characters: a girl (her) and a dog (you).
 * Want to use your own artwork or photos instead?
 * Put images in /public (e.g. public/her.png, public/me.png) and
 * pass an `img` prop: <Girl img="her.png" />
 */

export function Girl({ img, size = 160 }) {
  if (img) return <img className="avatar-img" src={img} width={size} alt="her" />;
  return (
    <svg className="avatar" width={size} viewBox="0 0 120 150" role="img" aria-label="Cartoon girl">
      {/* pigtails */}
      <circle cx="22" cy="48" r="13" fill="#5b3a29" />
      <circle cx="98" cy="48" r="13" fill="#5b3a29" />
      <circle cx="22" cy="48" r="5" fill="#ff5d8f" />
      <circle cx="98" cy="48" r="5" fill="#ff5d8f" />
      {/* hair back */}
      <circle cx="60" cy="48" r="38" fill="#5b3a29" />
      {/* body / dress */}
      <path d="M32 140 L40 98 Q60 108 80 98 L88 140 Z" fill="#ff7eb6" stroke="#222" strokeWidth="3" strokeLinejoin="round" />
      {/* arms */}
      <path d="M40 102 Q24 112 22 124" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 102 Q96 112 98 124" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="60" cy="58" r="34" fill="#ffd9b3" stroke="#222" strokeWidth="3" />
      {/* fringe */}
      <path d="M28 52 Q40 22 62 28 Q82 24 92 52 Q76 38 60 40 Q42 38 28 52 Z" fill="#5b3a29" stroke="#222" strokeWidth="3" strokeLinejoin="round" />
      {/* eyes */}
      <circle cx="47" cy="62" r="4.5" fill="#222" />
      <circle cx="73" cy="62" r="4.5" fill="#222" />
      <circle cx="48.5" cy="60.5" r="1.5" fill="#fff" />
      <circle cx="74.5" cy="60.5" r="1.5" fill="#fff" />
      {/* blush */}
      <ellipse cx="38" cy="73" rx="6" ry="3.5" fill="#ff9aa8" opacity=".7" />
      <ellipse cx="82" cy="73" rx="6" ry="3.5" fill="#ff9aa8" opacity=".7" />
      {/* smile */}
      <path d="M50 76 Q60 87 70 76" stroke="#222" strokeWidth="3" fill="#fff" strokeLinecap="round" />
      {/* party hat */}
      <path d="M44 28 L60 -2 L76 28 Z" fill="#ffd23f" stroke="#222" strokeWidth="3" strokeLinejoin="round" transform="translate(0 6)" />
      <circle cx="60" cy="4" r="4" fill="#ff5d5d" stroke="#222" strokeWidth="2" />
    </svg>
  );
}

export function Dog({ img, size = 150 }) {
  if (img) return <img className="avatar-img" src={img} width={size} alt="me" />;
  return (
    <svg className="avatar" width={size} viewBox="0 0 140 130" role="img" aria-label="Cartoon dog">
      {/* tail */}
      <path className="wag" d="M112 88 Q136 70 128 50" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="72" cy="98" rx="42" ry="26" fill="#e8b36a" stroke="#222" strokeWidth="3" />
      {/* legs */}
      <rect x="40" y="108" width="14" height="18" rx="7" fill="#e8b36a" stroke="#222" strokeWidth="3" />
      <rect x="88" y="108" width="14" height="18" rx="7" fill="#e8b36a" stroke="#222" strokeWidth="3" />
      {/* ears */}
      <path d="M32 30 Q14 36 18 68 Q36 66 44 46 Z" fill="#a8672d" stroke="#222" strokeWidth="3" strokeLinejoin="round" />
      <path d="M108 30 Q126 36 122 68 Q104 66 96 46 Z" fill="#a8672d" stroke="#222" strokeWidth="3" strokeLinejoin="round" />
      {/* head */}
      <ellipse cx="70" cy="56" rx="42" ry="36" fill="#f3c98b" stroke="#222" strokeWidth="3" />
      {/* muzzle */}
      <ellipse cx="70" cy="70" rx="20" ry="14" fill="#fff4de" stroke="#222" strokeWidth="3" />
      {/* eyes */}
      <circle cx="52" cy="50" r="5" fill="#222" />
      <circle cx="88" cy="50" r="5" fill="#222" />
      <circle cx="53.5" cy="48.5" r="1.7" fill="#fff" />
      <circle cx="89.5" cy="48.5" r="1.7" fill="#fff" />
      {/* nose + mouth */}
      <ellipse cx="70" cy="63" rx="7" ry="5" fill="#222" />
      <path d="M70 68 L70 74 M60 76 Q70 84 80 76" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* tongue */}
      <path d="M66 80 Q70 92 74 80 Z" fill="#ff7a8a" stroke="#222" strokeWidth="2" />
      {/* party hat */}
      <path d="M56 24 L70 -4 L84 24 Z" fill="#6ec6ff" stroke="#222" strokeWidth="3" strokeLinejoin="round" transform="translate(0 6)" />
      <circle cx="70" cy="3" r="4" fill="#ffd23f" stroke="#222" strokeWidth="2" />
    </svg>
  );
}
