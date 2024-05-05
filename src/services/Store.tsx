import React, { useMemo, useState } from "react";
import { Status } from "../types/Status";
import { Todo } from "../types/Todo";

type TodosContextProps = {
  todos: Todo[];
  setTodos: (newValue: Todo[]) => void;
  filter: Status;
  setFilter: (status: Status) => void;
  filteredTodos: Todo[];
  loadErrorMessage: string;
  setLoadErrorMessage: (message: string) => void;
  isHidden: boolean;
  setIsHidden: (val: boolean) => void;
  isSubmiting: boolean;
  setIsSubmiting: (val: boolean) => void;
  allTodosButton: boolean;
  setAllTodosButton: (val: boolean) => void;
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => [],
  filter: Status.All,
  setFilter: () => {},
  filteredTodos: [],
  loadErrorMessage: "",
  setLoadErrorMessage: () => {},
  isHidden: true,
  setIsHidden: () => {},
  isSubmiting: false,
  setIsSubmiting: () => {},
  allTodosButton: false,
  setAllTodosButton: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Status.All);
  const [loadErrorMessage, setLoadErrorMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [allTodosButton, setAllTodosButton] = useState(false);

  const filterTodos = (filterStatus: Status) => {
    switch (filterStatus) {
      case Status.Active:
        return todos.filter((todo) => !todo.completed);

      case Status.Completed:
        return todos.filter((todo) => todo.completed);

      case Status.All:
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(filter);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filter,
      setFilter,
      filteredTodos,
      loadErrorMessage,
      setLoadErrorMessage,
      isHidden,
      setIsHidden,
      isSubmiting,
      setIsSubmiting,
      allTodosButton,
      setAllTodosButton,
    }),
    [
      todos,
      filteredTodos,
      loadErrorMessage,
      isHidden,
      isSubmiting,
      filter,
      setFilter,
      allTodosButton,
      // setAllTodosButton,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
