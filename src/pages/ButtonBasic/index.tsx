import React, { useCallback } from 'react';
import styles from './index.less';
import { Button, message } from 'antd';

export default () => {
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
        message.info(JSON.stringify(event, null, 2));
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
        </div>
      </div>
    </div>
  );
};
