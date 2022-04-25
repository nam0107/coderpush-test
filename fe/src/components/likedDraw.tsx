/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './styles.module.css';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Image from 'next/image';

type DrawProps = {
  showDrawer: boolean;
  toggleDrawer: any;
  data: any[];
};
function Draw({ showDrawer, toggleDrawer, data }: DrawProps) {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <SwipeableDrawer
        anchor={'right'}
        open={showDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={'wrapLikedDraw'}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <div>
          <div className={styles.rowMobileMenu}>
            <div className={styles.wrapClose} onClick={toggleDrawer(false)}>
              <div>close</div>
            </div>
          </div>
          <div className={styles.wrapMenuContent}>
            {(data || []).map((user: any, i: React.Key | null | undefined) => {
              return (
                <div key={i} style={{ display: 'flex', marginBottom: '10px' }}>
                  <div
                    style={{
                      borderRadius: '5px',
                      overflow: 'hidden',
                      width: '150px',
                      height: '150px',
                    }}
                  >
                    <Image
                      src={user.image}
                      alt="Picture of the author"
                      width={150}
                      height={150}
                    />
                  </div>

                  <div
                    style={{
                      marginLeft: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div> Name: {user.full_name}</div>
                    <div> Age: {user.age}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}

export default Draw;
