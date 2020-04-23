import React, { useCallback } from 'react';
import styles from './index.less';
import { Button, message } from 'antd';

export default () => {
  const onNFCRead = useCallback(() => {
    message.info('start scanning');
    if ('NDEFReader' in window) {
      message.info('NDEFReader');
      const reader = new NDEFReader();
      reader
        .scan()
        .then(() => {
          message.info('Scan started successfully.');
          reader.onerror = () => {
            message.info('Cannot read data from the NFC tag. Try another one?');
          };
          reader.onreading = event => {
            const message = event.message;
            message.info(JSON.stringify(event, null, 2));
            for (const record of message.records) {
              message.info('Record type:  ' + record.recordType);
              message.info('MIME type:    ' + record.mediaType);
              message.info('Record id:    ' + record.id);
              switch (record.recordType) {
                case 'text':
                  // TODO: Read text record with record data, lang, and encoding.
                  break;
                case 'url':
                  // TODO: Read URL record with record data.
                  break;
                default:
                // TODO: Handle other records with record data.
              }
              message.info(JSON.stringify(record, null, 2));
            }
            message.info('NDEF message read.');
          };
        })
        .catch(error => {
          message.info(`Error! Scan failed to start: ${error}.`);
        });
    }
    if ('NDEFWriter' in window) {
      /* Write NFC tags */
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
