


import React from 'react';

export const TrophyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a2 2 0 00-2 2v1a2 2 0 002 2h0a2 2 0 002-2V4a2 2 0 00-2-2zM4 6A2 2 0 002 8v1h16V8a2 2 0 00-2-2h-3v1a2 2 0 11-4 0V6H4z" />
    <path fillRule="evenodd" d="M3 11v6a2 2 0 002 2h10a2 2 0 002-2v-6H3zm2.5 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
  </svg>
);

export const GraduationCapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className ?? "h-4 w-4 text-green-600 dark:text-green-400"} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
  </svg>
);

export const StreakIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.934l-6.75 12.25a1 1 0 001.649 1.805l6.75-12.25a1 1 0 00-.377-1.454zM9.5 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

export const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v2H7a2 2 0 00-2 2v7a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2zm-1 4V4a1 1 0 112 0v2H9z" clipRule="evenodd" />
  </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.5 18.75l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L18.5 18.75l-1.188.648a2.25 2.25 0 01-1.423 1.423z" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const StopwatchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PuzzlePieceIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v.033c0 .219-.055.438-.162.634a2.25 2.25 0 00-.83 1.434H10.5a1.5 1.5 0 00-1.5 1.5v1.5a1.5 1.5 0 001.5 1.5h.071a2.25 2.25 0 012.12 1.423 2.25 2.25 0 00.83 1.434c.107.196.162.415.162.634v.033c0 .355-.186.676-.401-.959a2.25 2.25 0 01-.349 1.003c0 1.035 1.007 1.875 2.25 1.875s2.25-.84 2.25-1.875c0-.369-.128-.713-.349-1.003a2.25 2.25 0 01-.401-.959v-.033c0-.219.055.438.162.634.24-.44.572-.828.94-1.158a1.5 1.5 0 00.41-1.066V12a1.5 1.5 0 00-1.5-1.5h-.071a2.25 2.25 0 01-2.12-1.423 2.25 2.25 0 00-.83-1.434c-.107-.196-.24-.415-.24-.634v-.033z" />
    </svg>
);

export const BookOpenIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0a8.967 8.967 0 00-6 2.292m6-2.292v14.25" />
    </svg>
);

export const CogIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.003 1.11-1.226M10.343 3.94a2.25 2.25 0 01-2.25 2.25c-.583 0-1.1-1.25-1.1-1.25S6.25 3.75 5.25 3.75c-.583 0-1.1 1.25-1.1 1.25S3.083 6 2.5 6c-.583 0-1.1-1.25-1.1-1.25S.25 3.75-.75 3.75c-.583 0-1.1 1.25-1.1 1.25S-3.083 6-3.5 6c-.583 0-1.1-1.25-1.1-1.25S-5.75 3.75-6.75 3.75c-.583 0-1.1 1.25-1.1 1.25S-9.083 6-9.5 6c-.583 0-1.1-1.25-1.1-1.25S-11.75 3.75-12.75 3.75c-.583 0-1.1 1.25-1.1 1.25S-15.083 6-15.5 6c-.583 0-1.1-1.25-1.1-1.25S-17.75 3.75-18.75 3.75c-.583 0-1.1 1.25-1.1 1.25S-21.083 6-21.5 6c-.583 0-1.1-1.25-1.1-1.25S-23.75 3.75-24.75 3.75M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.24-2.433-.68-3.536M19.5 12a2.25 2.25 0 01-2.25 2.25c-.583 0-1.1-1.25-1.1-1.25S15.083 12 14.5 12c-.583 0-1.1 1.25-1.1 1.25S12.25 14.25 11.25 14.25c-.583 0-1.1-1.25-1.1-1.25S9.083 12 8.5 12c-.583 0-1.1 1.25-1.1 1.25S6.25 14.25 5.25 14.25c-.583 0-1.1-1.25-1.1-1.25S3.083 12 2.5 12c-.583 0-1.1 1.25-1.1-1.25S.25 14.25-.75 14.25c-.583 0-1.1-1.25-1.1-1.25S-3.083 12-3.5 12c-.583 0-1.1 1.25-1.1-1.25S-5.75 14.25-6.75 14.25c-.583 0-1.1-1.25-1.1-1.25S-9.083 12-9.5 12c-.583 0-1.1 1.25-1.1-1.25S-11.75 14.25-12.75 14.25c-.583 0-1.1-1.25-1.1-1.25S-15.083 12-15.5 12c-.583 0-1.1 1.25-1.1-1.25S-17.75 14.25-18.75 14.25c-.583 0-1.1-1.25-1.1-1.25S-21.083 12-21.5 12m.21 6.337c.228.53.513 1.02.84 1.464M4.5 12c0 1.232.24 2.433.68 3.536M4.5 12a2.25 2.25 0 00-2.25 2.25c.583 0 1.1 1.25 1.1 1.25S4.917 18 5.5 18c.583 0 1.1-1.25 1.1-1.25S7.75 15.75 8.75 15.75c.583 0 1.1 1.25 1.1 1.25S10.917 18 11.5 18c.583 0 1.1-1.25 1.1-1.25S13.75 15.75 14.75 15.75c.583 0 1.1 1.25 1.1 1.25S16.917 18 17.5 18c.583 0 1.1-1.25 1.1-1.25S19.75 15.75 20.75 15.75c.583 0 1.1 1.25 1.1 1.25S22.917 18 23.5 18c.583 0 1.1-1.25 1.1-1.25s1.167-2.25 2.25-2.25M4.71 6.337A8.963 8.963 0 004.5 12" />
    </svg>
);

export const SitemapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177.177a2.25 2.25 0 01-3.182 0l-1.17-1.17a2.25 2.25 0 010-3.182l.177-.177m-6.69 14.036a2.25 2.25 0 01-3.182 0L3.11 15.11a2.25 2.25 0 010-3.182l1.17-1.17a2.25 2.25 0 013.182 0l.177.177" />
    </svg>
);

export const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.212-1.242-2.212H4.5A2.25 2.25 0 002.25 6v1.5a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 008.25 12v1.5a2.25 2.25 0 002.25 2.25h.618M15.75 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const CakeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.828l-8.228-8.228-1.586-1.586a2.25 2.25 0 00-3.182 0l-1.586 1.586L2.172 15.828m18.828 0A2.25 2.25 0 0119.5 17.25h-15a2.25 2.25 0 01-1.591-3.841M21 15.828c0-5.992-4.838-10.828-10.828-10.828S-1.656 9.836 2.172 15.828m18.828 0h-2.25m-14.328 0h2.25" />
    </svg>
);

export const PawPrintIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 11.25S7.5 7.5 11.25 7.5h1.5S16.5 7.5 16.5 11.25v1.5S16.5 15 12.75 15h-1.5S7.5 15 7.5 11.25v-1.5zm8.25-6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 5.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6.75 5.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4.5 11.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
);

export const SwitchHorizontalIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

export const ArrowLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

export const RefreshIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.18-3.182l-3.182-3.182a8.25 8.25 0 00-11.664 0l-3.18 3.185" />
    </svg>
);

export const GlobeAltIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.25 9.75h17.5M9 3.25c.468 5.462 2.502 9.42 4.5 11.516M15 20.75c-.468-5.462-2.502-9.42-4.5-11.516" />
    </svg>
);