import { Main } from "@/shared/layout/Main";
import { Section } from "@/shared/layout/Section";
import { TodoFolderList } from "@/widgets/todo-folder-list";

import styles from "./styles.module.scss";

export const Home: React.FC = () => {
  return (
    <Main>
      <Section>
        <h1>Todos</h1>
      </Section>
      <Section>
        <h2 className={styles.sectionHeader}>Choise or create Folder</h2>
        <TodoFolderList />
      </Section>
    </Main>
  );
};
