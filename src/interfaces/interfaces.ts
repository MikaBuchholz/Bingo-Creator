export interface RouterProps {
  user: any;
  setUser: any;
}

export interface LoginPageProps {
  user: any;
  setUser: any;
}

export interface PlayPageProps {
  user: any;
}

export interface CreatePageProps {
  user: any;
}

export interface AppBarProps {
  user: any;
}

export interface BingoCellProps {
  index: number;
  value: string;
  handleInput: (index: number, value: string) => void;
  gridStyle: "play" | "create";
  playBingoCallback: (value: string, index: number) => void | (() => void);
  bingoColors: string[] | null;
}

export interface BingoGridProps {
  activeSize: number;
  bingoField: string[];
  handleInput: (index: number, value: string) => void;
  gridStyle: "play" | "create";
  playBingoCallback: (value: string, index: number) => void | (() => void);
  bingoColors: string[] | null;
}

export interface BingoFieldProps {
  user: any;
  playBingoCallback: (value: string, index: number) => void | (() => void);
}
