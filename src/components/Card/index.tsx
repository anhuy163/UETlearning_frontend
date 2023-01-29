import styles from "./styles.module.less";
import { Button, Spin } from "antd";

export default function Card() {
  return (
    <>
      <div className={styles.container}>
        <Button>123</Button>
        <Spin />
      </div>
      <div className="text-3xl underline font-mono text-cyan-300 font-bold">
        12345
      </div>
      <Button>345</Button>
    </>
  );
}
