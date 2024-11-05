import { GoHome } from "@/features/go-home";
import { Main } from "@/shared/layout/Main";
import { Section } from "@/shared/layout/Section";
import { TodoList } from "@/widgets/todo-list";
import { useParams } from "react-router";

import styles from "./styles.module.scss";

export const Todo: React.FC = () => {
  const { folderName } = useParams();

  return (
    <Main>
      <Section>
        <GoHome className={styles.goHome} />
        <h1>{folderName && <span> {folderName}</span>}</h1>
      </Section>
      <Section>
        <TodoList folderName={folderName} />
      </Section>
    </Main>
  );
};
