'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import CharacterCard from './CharacterCard';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import Loading from './loading';

const Profile = () => {
  const router = useRouter();
  const asset_url = 'https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/';
  const [data, setData] = useState(null);
  const [character, setCharacter] = useState(null);
  const [selected, setSelected] = useState(0);
  const [showUID, setShowUID] = useState(true);
  const [blur, setBlur] = useState(false);
  const [savedUID, setSavedUID] = useState('');
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [buildName, setBuildName] = useState('');
  const [showSavedBuilds, setShowSavedBuilds] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const params = useParams();
  const uid = params.uid;
  const nickname = data?.player.nickname;

  useEffect(() => {
    setSavedUID(localStorage.getItem('uid'));
  }, []);

  const linkUID = useCallback(() => {
    localStorage.setItem('uid', uid);
    setSavedUID(uid);
    toast.success('UID linked!', {
      toastId: 'success-uid-linked',
    });
  }, [uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/u/${uid}?lang=${localStorage.getItem('lang')}`);
        if (res.ok) {
          const data = await res.json();
          setData(data);
        } else {
          toast.error(
            <div>
              Error fetching data!
              <br />
              Try again later or join our discord server for help.
            </div>,
            {
              toastId: 'error-fetching-data',
            }
          );
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setCharacter(data?.characters[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!localStorage.getItem('savedBuilds')) {
      localStorage.setItem('savedBuilds', JSON.stringify([]));
    }
    setSavedBuilds(JSON.parse(localStorage.getItem('savedBuilds')));
  }, []);

  const saveBuild = useCallback(() => {
    if (!buildName) {
      toast.error('Enter a build name!', {
        toastId: 'error-build-name-empty',
      });
      return;
    }
    const newBuild = {
      uid: data?.player.uid,
      nickname: data?.player.nickname,
      buildName: buildName,
      character: character,
    };

    const newBuilds = [...savedBuilds, newBuild];
    localStorage.setItem('savedBuilds', JSON.stringify(newBuilds));
    setSavedBuilds(newBuilds);
    toast.success(`${buildName} saved!`, {
      toastId: `success-build-saved-${buildName}`,
    });
    setBuildName('');
  }, [character, buildName, savedBuilds]);

  const deleteBuild = useCallback(
    (index) => {
      const newBuilds = savedBuilds.filter((build, i) => i !== index);
      localStorage.setItem('savedBuilds', JSON.stringify(newBuilds));
      setSavedBuilds(newBuilds);
      toast.success('Build deleted!', {
        toastId: `success-build-deleted-${index}`,
      });
    },
    [savedBuilds]
  );

  const ref = useRef(null);
  const saveImage = useCallback(
    (name, scale) => {
      if (ref.current === null) {
        return;
      }

      html2canvas(ref.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: scale,
      }).then((canvas) => {
        canvas.toBlob(function (blob) {
          saveAs(blob, `${name}_Card_${uid}.png`);
        });
      });
    },
    [ref]
  );

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex h-auto min-h-screen items-center justify-center">
        <div className="flex overflow-auto">
          <div className="my-5 flex flex-col lg:items-center">
            <div className="mx-3 flex h-auto w-[95vw] flex-col items-center justify-center gap-4 lg:w-[600px]">
              <Image
                src={asset_url + data?.player.avatar.icon}
                width={120}
                height={120}
                alt="Avatar Icon"
                className="rounded-full border-2 border-stone-300 bg-stone-500"
              />
              <span className="text-3xl">{nickname}</span>
              <div className="flex w-full flex-row items-center justify-evenly gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-2xl text-neutral-400">Trailblaze Level</span>
                  <span className="text-xl">{data?.player.level}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl text-neutral-400">Equilibrium Level</span>
                  <span className="text-xl">{data?.player.world_level}</span>
                </div>
              </div>
              <div className="flex w-3/4 flex-col gap-2">
                <span className="text-2xl text-neutral-400">Trailblaze Records</span>
                <div className="flex flex-row flex-wrap justify-between gap-x-4 ">
                  <span className="text-xl">Characters Owned</span>
                  <span className="text-xl">{data?.player.space_info.avatar_count}</span>
                </div>
                <div className="flex flex-row flex-wrap justify-between gap-x-4">
                  <span className="text-xl">Achievements Unlocked: </span>
                  <span className="text-xl">{data?.player.space_info.achievement_count}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">UID {data?.player.uid}</span>
                <div className="flex flex-row flex-wrap justify-center gap-4">
                  <div
                    className="flex cursor-pointer flex-row justify-center gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                    onClick={() => router.push('/')}
                  >
                    <Image
                      src={asset_url + 'icon/sign/ReplacementIcon.png'}
                      alt="Change UID Icon"
                      width={24}
                      height={24}
                    />
                    <span>Change UID</span>
                  </div>
                  {savedUID !== uid && (
                    <div
                      className="flex cursor-pointer flex-row justify-center gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                      onClick={linkUID}
                    >
                      <Image
                        src={asset_url + 'icon/sign/FriendAddIcon.png'}
                        alt="Example Icon"
                        width={24}
                        height={24}
                      />
                      <span>Link UID</span>
                    </div>
                  )}
                  <div
                    className="flex cursor-pointer flex-row justify-center gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                    onClick={() => {
                      setShowSavedBuilds(!showSavedBuilds);
                      setSelected(null);
                    }}
                  >
                    <Image src={asset_url + 'icon/sign/TeamIcon.png'} alt="Change UID Icon" width={24} height={24} />
                    <span>{showSavedBuilds ? 'Profile' : 'Saved Builds'}</span>
                  </div>
                </div>
              </div>
              {showSavedBuilds ? (
                <div className="mb-1 flex w-[400px] gap-6 overflow-x-auto p-6 md:w-[600px]">
                  {savedBuilds.map((build, index) => (
                    <div
                      className={`
                          
                          flex
                          w-[100px]
                          cursor-pointer 
                          rounded-tr-2xl
                          shadow-md 
                          hover:brightness-110
                          ${selected === index && 'ring-2 ring-neutral-300 '}
                        `}
                      onClick={() => {
                        setCharacter(savedBuilds[index].character);
                        setSelected(index);
                        setCustomImage(null);
                      }}
                      key={index}
                    >
                      <div className="relative flex w-[100px] flex-col">
                        <div className="relative">
                          <Image
                            src={asset_url + build.character.preview}
                            alt="Character Preview"
                            width={96}
                            height={96}
                          />
                          <span className="absolute bottom-0 left-0 w-full p-1">{build.buildName}</span>
                        </div>
                        {selected === index && (
                          <div
                            className={'absolute left-0 top-0 text-gray-400 hover:text-gray-500'}
                            onClick={() => deleteBuild(index)}
                          >
                            <span className="sr-only">Delete</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-row flex-wrap justify-center gap-6 p-6 md:flex-nowrap">
                  {data?.characters.map((character, index) => (
                    <Image
                      src={asset_url + character.icon}
                      alt="Character Preview"
                      width={96}
                      height={96}
                      className={`
                            cursor-pointer 
                            rounded-full 
                            hover:brightness-110 
                            ${selected === index && 'bg-white ring-2 ring-neutral-300'}
                          `}
                      onClick={() => {
                        setCharacter(data?.characters[index]);
                        setSelected(index);
                        setCustomImage(null);
                      }}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
            {character && (
              <>
                <div className="flex w-screen overflow-x-auto 2xl:justify-center">
                  <div className="showcase mx-3" ref={ref} style={{ fontFamily: 'var(--font-nunito)' }}>
                    <CharacterCard
                      character={character}
                      uid={uid}
                      nickname={nickname}
                      showUID={showUID}
                      blur={blur}
                      customImage={customImage}
                    />
                  </div>
                </div>

                <div className="flex w-screen flex-col items-center justify-center">
                  <div
                    className="my-2 flex cursor-pointer flex-row justify-center gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                    onClick={() => saveImage(character.name, `${customImage ? 1 : 1.5}`)}
                  >
                    <Image
                      src={asset_url + 'icon/sign/SettingsImageIcon.png'}
                      alt="Save Image Icon"
                      width={32}
                      height={32}
                    />
                    <span className="text-3xl">Download</span>
                  </div>
                  <div className="mx-3 my-2 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    <div>
                      <label className="h-[30px] cursor-pointer gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none">
                        Custom Image
                        <input
                          type="file"
                          onChange={(e) => setCustomImage(URL.createObjectURL(e.target.files[0]))}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <div
                      className="h-[30px] cursor-pointer gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                      onClick={() => setShowUID(!showUID)}
                    >
                      <span>{!showUID ? 'Show' : 'Hide'} UID / Name</span>
                    </div>
                    <div
                      className="h-[30px] cursor-pointer gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                      onClick={() => setBlur(!blur)}
                    >
                      <span>Toggle Blur</span>
                    </div>
                  </div>
                  <div className="my-2 flex">
                    <input
                      type="text"
                      name="buildName"
                      onChange={(e) => setBuildName(e.target.value)}
                      className="relative m-0 -mr-0.5 flex rounded-l border border-neutral-300 bg-clip-padding px-3 text-base leading-[1.6] text-neutral-600 outline-none"
                      value={buildName}
                      placeholder="Build Name"
                      aria-label="Build Name"
                      maxLength={30}
                    />
                    <div
                      className="h-[30px] cursor-pointer gap-2 rounded bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none"
                      onClick={saveBuild}
                    >
                      Save Build
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
