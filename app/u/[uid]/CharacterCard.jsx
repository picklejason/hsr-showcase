import { AiFillLock } from 'react-icons/ai';

const CharacterCard = ({ character, uid, nickname, showUID, blur }) => {
  const asset_url = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
  return (
    <div className={`relative min-h-[600px] w-[1420px] overflow-hidden rounded-3xl ${blur ? 'Blur-BG' : 'BG'}`}>
      <div className="absolute bottom-2 left-4 z-10">
        <span className={`${showUID ? '' : 'hidden'} shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]`}>
          {uid} · {nickname}
        </span>
      </div>
      <div className="flex flex-row items-center">
        <div className="z-0 w-1/4 items-center">
          <img src={asset_url + character?.portrait} alt="Character Preview" className="scale-[2]" />
        </div>

        <div
          className={`relative z-10 flex min-h-[600px] w-3/4 flex-row items-center gap-3.5 ${blur ? 'BG' : 'Blur-BG'}`}
        >
          <div className="w-1/11 ml-2 mr-[-20px]">
            <div className="relative right-[32px] pb-[250px] pt-[10px] before:absolute before:left-1/2 before:top-0 before:h-full before:w-[2px] before:bg-neutral-300">
              <div className="flex flex-col">
                {character?.rank_icons.slice(0, character?.rank).map((rank_icon) => (
                  <div
                    key={rank_icon.id}
                    className="relative my-2 flex rounded-full border-2 border-neutral-300 bg-neutral-800"
                  >
                    <img src={asset_url + rank_icon} alt="Rank Icon" className="h-auto w-12" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {character?.rank_icons.slice(character?.rank, 6).map((rank_icon) => (
                  <div
                    key={rank_icon.id}
                    className="relative my-2 flex rounded-full border-2 border-neutral-500 bg-neutral-800"
                  >
                    <img src={asset_url + rank_icon} alt="Rank Icon" className="h-auto w-12 scale-[0.9]" />
                    <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-800/70">
                      <AiFillLock className="h-6 w-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-1/3 flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-row items-center justify-between">
                <span className="text-5xl">{character?.name}</span>
                <img src={asset_url + character?.element.icon} alt="Element Icon" className="h-auto w-14" />
              </div>

              <div className="flex flex-row items-center gap-2">
                <img src={asset_url + character?.path.icon} alt="Path Icon" className="h-auto w-8" />
                <span className="text-xl">{character?.path.name}</span>
              </div>
              <div>
                <img
                  src={asset_url + 'icon/deco/Star' + character?.rarity + '.png'}
                  alt="Character Rarity Icon"
                  className="h-auto w-24"
                />
              </div>
              <div>
                <span className="text-2xl">Lv. {character?.level}</span>
                <span className="text-xl"> / </span>
                <span className="text-xl text-neutral-400">{character?.promotion * 10 + 20}</span>
              </div>
            </div>
            {character?.light_cone ? (
              <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center">
                  <img
                    src={asset_url + character?.light_cone?.preview}
                    alt="Light Cone Preview"
                    className="h-auto w-32"
                  />
                  <img
                    src={asset_url + 'icon/deco/Rarity' + character?.light_cone?.rarity + '.png'}
                    alt="Light Cone Rarity Icon"
                    className="relative bottom-8 h-auto w-36"
                  />
                </div>
                <div className="flex w-3/5 flex-col gap-2 text-center">
                  <span className="text-xl">{character?.light_cone?.name}</span>
                  <span className="text-base text-[#dcc491]">Superimposition {character?.light_cone?.rank}</span>
                  <div>
                    <span className="text-lg">Lv. {character?.light_cone?.level}</span>
                    <span> / </span>
                    <span className="text-neutral-400">{character?.light_cone?.promotion * 10 + 20}</span>
                  </div>
                  <div className="flex flex-row justify-evenly">
                    {character?.light_cone?.attributes.map((attribute) => (
                      <div key={attribute.id} className="black-blur flex flex-row items-center rounded pr-1">
                        <img src={asset_url + attribute.icon} alt="Attribute Icon" className="h-auto w-6" />
                        <span className="text-sm">{attribute.display}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <span className="flex justify-center">No Light Cone Equipped</span>
            )}
            <div className="flex flex-row justify-evenly">
              {character?.skill_trees.slice(0, 4).map((skill, index) => (
                <div key={skill.id} className="flex flex-col items-center ">
                  <img
                    src={asset_url + skill.icon}
                    alt="Skill Icon"
                    className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800"
                  />
                  <span className="text-base">Lv. {skill.level}</span>
                  <span className="text-sm">{character?.skills[index].type_text}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex flex-col items-center gap-1">
              {character?.relic_sets.map((relic_set) => (
                <div key={relic_set.id} className="flex w-3/4 flex-row justify-between text-left">
                  <span className="text-base">{relic_set.name}</span>
                  <div>
                    <span className="black-blur flex w-5 rounded px-1.5 py-0.5">{relic_set.num}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full flex-col justify-center gap-y-1.5 text-lg">
              {character?.property.map((stat) => (
                <div key={stat.id} className="flex flex-row items-center">
                  <div className="flex flex-row items-center">
                    <img src={asset_url + stat.icon} alt="Stat Icon" className="h-auto w-9" />
                    <span>{stat.name}</span>
                  </div>
                  <span className="m-5 flex-grow rounded border-[1px] border-neutral-300"></span>
                  <div className="flex flex-col text-right">
                    <span>{stat.display}</span>
                    <div className="flex flex-row">
                      {stat.addition && (
                        <span className="text-xs">
                          {stat.base}
                          <span className="text-blue-300"> +{stat.addition}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col justify-between gap-1.5 text-lg">
              {character?.relics.map((relic) => (
                <div key={relic.id} className="black-blur relative flex flex-row items-center rounded-s-lg p-2">
                  <div className="flex">
                    <img src={asset_url + relic.icon} alt="Relic Icon" className="h-auto w-20" />
                    <img
                      src={asset_url + 'icon/deco/Star' + relic.rarity + '.png'}
                      alt="Relic Rarity Icon"
                      className="absolute bottom-2 h-auto w-20"
                    />
                  </div>
                  <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                    <img src={asset_url + relic.main_affix.icon} alt="Main Affix Icon" className="h-auto w-9" />
                    <span className="text-lg text-[#f1a23c]">{relic.main_affix.display}</span>
                    <span className="black-blur rounded px-1 text-xs">+{relic.level}</span>
                  </div>
                  <div className="inline-block h-[80px] min-h-[1em] w-0.5 self-stretch bg-neutral-300"></div>
                  <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                    {relic.sub_affix.map((sub_affix) => (
                      <div key={sub_affix.id} className="flex flex-row items-center">
                        <img src={asset_url + sub_affix.icon} alt="Sub Affix Icon" className="h-auto w-7" />
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
  );
};

export default CharacterCard;
