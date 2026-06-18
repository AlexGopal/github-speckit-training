import { buttonPrimary, dangerButton } from "./theme";

type GoalActionsProps = {
  onComplete: () => void;
  onDelete: () => void;
};

export function GoalActions({ onComplete, onDelete }: GoalActionsProps) {
  return (
    <>
      <button type="button" className={buttonPrimary} onClick={onComplete}>
        Complete
      </button>
      <button type="button" className={dangerButton} onClick={onDelete}>
        Delete
      </button>
    </>
  );
}
