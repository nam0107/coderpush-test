import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../../styles/Home.module.css';
import TinderCard from 'react-tinder-card';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { useQuery } from 'react-query';
import { createRequest } from '../utils';
import { configs } from '../configs';
import LikedDraw from '../components/likedDraw';

const HomeContainer = () => {
  const [id, setId] = useState(1);
  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  const limit = 10;
  const getListUser = async (page: number = 0, id: number) => {
    return createRequest(
      `${configs.apiEndpoint}/tinder/v1/get-all-user/${id}?size=${limit}&page=${page}&sort=desc`,
      {
        method: 'GET',
      }
    );
  };
  const getUserDetail = async (id: number = 1) => {
    return createRequest(`${configs.apiEndpoint}/tinder/v1/user/${id}`, {
      method: 'GET',
    });
  };
  const updateUser = async (id: number, liked?: number, passed?: number) => {
    const dataUpdate: any = {};
    if (liked) {
      dataUpdate.liked = liked;
    }
    if (passed) {
      dataUpdate.passed = passed;
    }
    return createRequest(`${configs.apiEndpoint}/tinder/v1/user/${id}`, {
      method: 'PUT',
      data: dataUpdate,
    });
  };
  const [currentUserId, setCurrentUserId] = useState<number>();
  const [page, setPage] = useState(1);
  const [childRefs, setChildRefs] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  useQuery(['getListUser', page, id], () => getListUser(page, id), {
    refetchOnWindowFocus: false,
    select: (data) => {
      return {
        ...data,
        data: data?.data,
      };
    },
    onSuccess: (data) => {
      setData((preVal: any[]) => {
        return [...preVal, ...data?.data];
      });
      setChildRefs((preVal: any) => {
        return [
          ...preVal,
          ...Array(data?.data?.length)
            .fill(0)
            .map((i) => React.createRef()),
        ];
      });
    },
  });

  const [userDetail, setUserDetail] = useState<any>({});
  const { refetch: refetchGetDetailUser } = useQuery(
    ['getUserDetail', id],
    () => getUserDetail(id),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setUserDetail(data?.data);
      },
    }
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipe = useCallback(
    async (dir: any) => {
      if (currentIndex < data.length) {
        await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      }
    },
    [childRefs, currentIndex, data.length]
  );
  // set last direction and decrease current index
  const swiped = useCallback(
    async (dir: string, index: number, current_id: number) => {
      if (index > page * limit + 2) {
        setPage((preValue: number) => {
          return preValue + 1;
        });
      }
      setTimeout(() => {
        setCurrentIndex(index + 1);
      }, 200);
      try {
        if (dir === 'right') {
          await updateUser(id, current_id, undefined);
        }
        if (dir === 'left') {
          await updateUser(id, undefined, current_id);
        }
        refetchGetDetailUser();
      } catch (error) {
        console.log(error);
      }
    },
    [id, page, refetchGetDetailUser]
  );

  const [showDrawerLiked, setShowDrawerLike] = useState(false);
  const [showDrawerPassed, setShowDrawerPassed] = useState(false);
  const toggleDrawerLike =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setShowDrawerLike(open);
    };
  const toggleDrawerPassed =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setShowDrawerPassed(open);
    };

  return (
    <div id="root">
      <LikedDraw
        data={userDetail?.liked}
        showDrawer={showDrawerLiked}
        toggleDrawer={toggleDrawerLike}
      />
      <LikedDraw
        data={userDetail?.passed}
        showDrawer={showDrawerPassed}
        toggleDrawer={toggleDrawerPassed}
      />
      <div className="app">
        <div className={styles.wrapContainer}>
          <div className={styles.mainScreen}>
            <div className={styles.wrapSwiper}>
              <div className="cardContainer" style={{ position: 'relative' }}>
                {showSwiper &&
                  data.map((character: any, index: number) => {
                    const tinderCardProps = {
                      ref: childRefs[index],
                      className: 'swipe',
                      preventSwipe: ['up', 'down'],
                      onSwipe: (direction: string) =>
                        swiped(direction, index, character.id),
                    };
                    return (
                      <div
                        key={character.id}
                        style={{
                          zIndex: `${currentIndex === index ? 0 : `${-index}`}`,
                          position: 'absolute',
                        }}
                      >
                        <TinderCard {...tinderCardProps}>
                          <div
                            style={{
                              backgroundImage: 'url(' + character.image + ')',
                            }}
                            className="card"
                          >
                            <h3>{`Name: ${character.full_name}`}</h3>
                            <h4>{` Age: ${character.age}`}</h4>
                          </div>
                        </TinderCard>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={styles.wrapButtonSection}>
              <Button onClick={() => setShowDrawerPassed(true)}>Passed</Button>
              <IconButton onClick={() => swipe('left')}>
                <CloseIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={() => swipe('right')}>
                <FavoriteIcon fontSize="large" />
              </IconButton>
              <Button onClick={() => setShowDrawerLike(true)}>Liked</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
