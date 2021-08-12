import React from 'react';
import { Button, Empty } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageNotFound(props) {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      <Empty
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
        description={
          <>
            <span>{t('NotFoundPage.Message')}</span>
            <div>
              <Button
                onClick={() => {
                  history.push('/home');
                }}
              >
                {t('NotFoundPage.Btn')}
              </Button>
            </div>
          </>
        }
      />
    </>
  );
}

export default PageNotFound;
