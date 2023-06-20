import { Dispatch, createContext, useContext } from "react"

export type AppState = {
  showInactive: boolean,
  pupilFilter: string, 
}

export const AppStateContext = createContext<AppState>({
  showInactive: false,
  pupilFilter: "",
})

export type AppStateMutation = 
  | { property: "showInactive", mutation: boolean }
  | { property: "pupilFilter", mutation: string }

export const AppStateMutationFnContext = createContext<Dispatch<AppStateMutation> | undefined>(undefined)

export function useAppStateMutationFn(): Dispatch<AppStateMutation> {
  let context = useContext(AppStateMutationFnContext)
  if (context === undefined) {
    throw Error("AppStateMutationFn has not been set in app root")
  }
  return context
}

export function useAppState(): [AppState, Dispatch<AppStateMutation>] {
  return [useContext(AppStateContext), useAppStateMutationFn()]
}

export function mutateAppState(state: AppState, mutation: AppStateMutation): AppState {
  switch (mutation.property) {
    case "showInactive": {
      return {...state, showInactive: mutation.mutation};
    }
    case "pupilFilter": {
      return {...state, pupilFilter: mutation.mutation};
    }
  }
}