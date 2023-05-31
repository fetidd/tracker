import { Dispatch, createContext } from "react"

export type AppState = {
  showInactive: boolean  
}

export const AppStateContext = createContext<AppState>({
  showInactive: false
})

export const AppStateMutationFnContext = createContext<Dispatch<AppStateMutation> | null>(null)

export type AppStateMutation = 
  | { property: "showInactive", mutation: boolean }

export function mutateAppState(state: AppState, mutation: AppStateMutation): AppState {
  switch (mutation.property) {
    case "showInactive": {
      return {...state, showInactive: mutation.mutation};
    }
  }
}