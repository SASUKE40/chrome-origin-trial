import React, { useCallback, useState } from 'react';
import styles from './index.less';
import { Button, Card, message } from 'antd';

export default () => {
  const [record, setRecord] = useState();
  const onNFCRead = useCallback(async () => {
    message.info('User clicked scan button');

    try {
      const reader = new NDEFReader();
      await reader.scan();
      message.info('> Scan started');

      reader.addEventListener('error', error => {
        message.error(`Argh! ${error.message}`);
      });

      reader.addEventListener('reading', event => {
        const { message, serialNumber } = event;
        message.info(`> Serial Number: ${serialNumber}`);
        message.info(`> Records: (${message.records.length})`);
        setRecord(message.records);
      });
    } catch (error) {
      message.error('Argh! ' + error);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div id="components-button-demo-basic">
        <div>
          <Button type="primary" onClick={onNFCRead}>
            Read NFC Message
          </Button>
          <Card title="NFC Record">{JSON.stringify(record, null, 2)}</Card>
        </div>
      </div>
    </div>
  );
};
