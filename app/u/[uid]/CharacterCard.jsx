'use client';

import { AiFillLock } from "react-icons/ai";

const CharacterCard = ({ character, uid, showUID }) => {
  const asset_url = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/"
  return (
    <div className="w-[1600px] h-[600px] rounded-xl BG overflow-hidden">
      <div className="flex flex-row text-white items-center">
        <div className="w-1/4 z-0 items-center">
          <img 
            src={asset_url + character?.portrait} 
            alt="Character Preview"
            className="scale-[2.2]"
          />
        </div>

      <div className="w-[1200px] h-[600px] Blur-BG flex flex-row text-white items-center z-10 gap-5 relative">
        <div className="w-1/11 ml-2">
          <div className="flex flex-col">
            {character?.rank_icons.slice(0, character?.rank).map((rank_icon) => (
              <div key={rank_icon.id} className="flex relative my-2 rounded-full bg-neutral-800 border-neutral-300 border-2">
                <img
                  src={asset_url + rank_icon}
                  alt="Rank Icon"
                  className="w-12 h-auto"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {character?.rank_icons.slice(character?.rank, 6).map((rank_icon) => (
              <div key={rank_icon.id} className="flex relative my-2 rounded-full bg-neutral-800 border-neutral-500 border-2">
                <img 
                  src={asset_url + rank_icon}
                  alt="Rank Icon"
                  className="w-12 h-auto scale-[0.9]"
                />
                <div className="flex justify-center items-center absolute rounded-full bg-neutral-800/70 w-full h-full">
                  <AiFillLock className="w-6 h-6"/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 h-full flex flex-col justify-evenly">
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-row justify-between items-center">
                <span className="text-5xl">{character?.name}</span>
                <img 
                  src={asset_url + character?.element.icon}
                  alt="Element Icon"
                  className="w-12 h-auto"
                />
            </div>
                
            <div className="flex flex-row gap-2 items-center">
              <img 
                src={asset_url + character?.path.icon}
                alt="Path Icon"
                className="w-8 h-auto"
              />
              <span className="text-xl">{character?.path.name}</span>
            </div>
            <div>
              <img 
                src={asset_url + "icon/deco/Star" + character?.rarity + ".png"}
                alt="Character Rarity Icon"
                className="w-24 h-auto"
              />
            </div>
            <div>
              <span className="text-2xl">Lv. {character?.level} </span>
              /
              <span className="text-xl text-neutral-400"> {character?.promotion * 10 + 20}</span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center">
              <img 
                src={asset_url + character?.light_cone.preview}
                alt="Light Cone Preview"
                className="w-32 h-auto"
              />
              <img 
                src={asset_url + "icon/deco/Rarity" + character?.light_cone.rarity + ".png"}
                alt="Light Cone Rarity Icon"
                className="w-36 h-auto relative bottom-8"
              />
            </div>
            <div className="flex flex-col text-center gap-2 w-1/2">
              <span className="text-xl">{character?.light_cone.name}</span>
              <span className="text-base text-[#dcc491]">Superimposition {character?.light_cone.rank}</span>
              <div>
                <span className="text-lg">Lv. {character?.light_cone.level} </span>
                / 
                <span className="text-neutral-400"> {character?.light_cone.promotion * 10 + 20}</span>
              </div>
              <div className="flex flex-row justify-evenly">
              {character?.light_cone.attributes.map((attribute) => (
                <div key={attribute.id} className="flex flex-col items-center black-blur p-1 rounded-lg w-1/5 ">
                  <img 
                    src={asset_url + attribute.icon}
                    alt="Attribute Icon"
                    className="w-6 h-auto"
                  />
                  <span className="text-sm">{attribute.display}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly">
            {character?.skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex flex-col items-center ">
                  <img 
                    src={asset_url + skill.icon}
                    alt="Skill Icon"
                    className="w-12 h-auto rounded-full bg-neutral-800 border-neutral-500 border-2"
                  />
                  <span className="text-base">Lv. {skill.level}</span>
                  <span className="text-sm">{skill.type_text}</span>
                </div>
            ))}
          </div>
          <hr />
          <div className="flex flex-col items-center gap-1">
              {character?.relic_sets.map((relic_set) => (
                <div key={relic_set.id} className="flex flex-row justify-between w-3/4 text-left">
                  <span className="text-base">{relic_set.name}</span>
                  <div className=""><span className="black-blur py-0.5 px-1.5 rounded w-5 text-center">{relic_set.num}</span></div>
                </div>
              ))}
          </div>
          <div className="">
            <span className={`${showUID ? "" : "hidden"}`}>UID {uid}</span>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex flex-col gap-y-2.5 text-lg">
            {character?.property.map((stat) => (
              <div key={stat.id} className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                  <img 
                    src={asset_url + stat.icon}
                    alt="Stat Icon"
                    className="w-9 h-auto"
                  />
                  <span>{stat.name}</span>
                </div>
                <span>{stat.display}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
        <div className="flex flex-col justify-between gap-1 text-lg">
          {character?.relics.map((relic) => (
            <div key={relic.id} className="flex flex-row rounded-s-lg relative items-center space-x-4 p-2 black-blur">
              <div className="flex">
                <img 
                  src={asset_url + relic.icon}
                  alt="Relic Icon"
                  className="w-20 h-auto"
                />
                <img 
                  src={asset_url + "icon/deco/Star" + relic.rarity + ".png"}
                  alt="Relic Rarity Icon"
                  className="w-20 h-auto absolute bottom-2"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-1/6">
                <img 
                  src={asset_url + relic.main_affix.icon}
                  alt="Main Affix Icon"
                  className="w-9 h-auto"
                />
                <span className="text-lg text-[#f1a23c]">{relic.main_affix.display}</span>
                <span className="text-xs black-blur px-1 rounded">+{relic.level}</span>
              </div>
              <div
                className="
                  inline-block 
                  h-[80px] 
                  min-h-[1em] 
                  w-0.5 
                  self-stretch 
                  bg-neutral-300
                "
              >
              </div>
              <div className="grid grid-cols-2 m-auto gap-2 w-1/2 pr-2">
                {relic.sub_affix.map((sub_affix) => (
                  <div key={sub_affix.id} className="flex flex-row items-center">
                    <img 
                      src={asset_url + sub_affix.icon}
                      alt="Sub Affix Icon"
                      className="w-7 h-auto"
                    />
                    <span className="text-base">+{sub_affix.display}</span>
                  </div>
                  
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </div>
)}

export default CharacterCard;