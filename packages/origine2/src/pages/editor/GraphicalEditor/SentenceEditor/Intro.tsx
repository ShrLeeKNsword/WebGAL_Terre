import CommonOptions from "../components/CommonOption";
import {ISentenceEditorProps} from "./index";
import styles from "./sentenceEditor.module.scss";
import {useValue} from "../../../../hooks/useValue";
import {cloneDeep} from "lodash";
import {DefaultButton, Dropdown, ColorPicker, IColor} from "@fluentui/react";
import useTrans from "@/hooks/useTrans";
import { getArgByKey } from "../utils/getArgByKey";
import { useState } from "react";
import React from 'react';
import {logger} from "@/utils/logger";

export default function Intro(props: ISentenceEditorProps) {
  const t = useTrans('editor.graphical.sentences.intro.options.');
  const introTextList = useValue(props.sentence.content.split("|"));
  const initialBackgroundColor: IColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 100,
    h: 0,
    s: 0,
    v: 0,
    hex: '000000',
    str: '000000',
  };
  const initialFontColor: IColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 100,
    h: 0,
    s: 0,
    v: 0,
    hex: 'FFFFFF',
    str: 'FFFFFF',
  };

  const getBackgroundColor = (): IColor => {
    let colorValue = props.sentence.args.find(arg => arg.key === 'backgroundColor')?.value;

    if (typeof colorValue === 'string') {
      const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/);

      if (match && match.length === 5) {
        const [_, r, g, b, a] = match.map(Number);
        return {
          r,
          g,
          b,
          a: a * 100,
          h: 0,
          s: 0,
          v: 0,
          hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
          str: `rgba(${r}, ${g}, ${b}, ${a})`,
        };
      }
    }
    return initialBackgroundColor;
  };

  const getFontColor = (): IColor => {
    let colorValue = props.sentence.args.find(arg => arg.key === 'fontColor')?.value;

    if (typeof colorValue === 'string') {
      const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/);

      if (match && match.length === 5) {
        const [_, r, g, b, a] = match.map(Number);
        return {
          r,
          g,
          b,
          a: a * 100,
          h: 0,
          s: 0,
          v: 0,
          hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
          str: `rgba(${r}, ${g}, ${b}, ${a})`,
        };
      }
    }
    return initialFontColor;
  };

  const getInitialFontSize = (): string => {
    const fontSizeValue = getArgByKey(props.sentence, "fontSize");

    if (typeof fontSizeValue === 'string' && ["small", "medium", "large"].includes(fontSizeValue)) {
      return fontSizeValue;
    }

    return "medium";
  };

  
  const getInitialAnimation = (): string => {
    const animationValue = getArgByKey(props.sentence, "animation");

    if (typeof animationValue === 'string' && ["fadeIn","slideIn","typingEffect","pixelateEffect","revealAnimation"].includes(animationValue)) {
      return animationValue;
    }

    return "fadeIn";
  };

  
  const getInitialDelayTime = (): string => {
    const delayTimeValue = getArgByKey(props.sentence, "delayTime");

    if (typeof delayTimeValue === 'number' && [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].includes(delayTimeValue)) {
      return delayTimeValue.toString();
    }
    return "1500";
  };

  const fontSizes = [
    {key: "small", text: "small"},
    {key: "medium", text: "medium"},
    {key: "large", text: "large"},
  ];

  const animations = [
    { key: "fadeIn", text: "fadeIn" },
    { key: "slideIn", text: "slideIn" },
    { key: "typingEffect", text: "typingEffect" },
    { key: "pixelateEffect", text: "pixelateEffect" },
    { key: "revealAnimation", text: "revealAnimation" },
  ];

  const delayTimes = [
    { key: "1500", text: "1.5" },
    { key: "2000", text: "2" },
    { key: "2500", text: "2.5" },
    { key: "3000", text: "3" },
    { key: "3500", text: "3.5" },
    { key: "4000", text: "4" },
    { key: "4500", text: "4.5" },
    { key: "5000", text: "5" },
  ];

  const backgroundColor = useValue(getBackgroundColor());
  const fontColor = useValue(getFontColor());
  const fontSize = useValue(getInitialFontSize());
  const animation = useValue(getInitialAnimation());
  const delayTime = useValue(getInitialDelayTime());
  const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor.value);
  const [localFontColor, setLocalFontColor] = useState(fontColor.value);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
      setIsAccordionOpen(!isAccordionOpen);
  };
  const optionButtonStyles = {
    root: {
        backgroundColor: '#0078d4',
        color: 'white',
        margin: '6px 0 0 0',
        display: 'flex'
    },
    rootHovered: {
        backgroundColor: '#005a9e',
        color: 'white'
    },
  };

  const handleLocalBackgroundColorChange = (ev: React.SyntheticEvent<HTMLElement>, newColor: IColor) => {
    setLocalBackgroundColor(newColor);
  };

  const handleLocalFontColorChange = (ev: React.SyntheticEvent<HTMLElement>, newColor: IColor) => {
    setLocalFontColor(newColor);
  };

  const handleSubmit = () => {
    backgroundColor.set(localBackgroundColor);
    fontColor.set(localFontColor);
    submit();
  };

  const submit = () => {
    const introText = introTextList.value.join("|");
    const selectedFontSize = fontSize.value;
    const selectedAnimation = animation.value;
    const selectedDelayTime = delayTime.value;
    const backgroundRgbaColor = `rgba(${backgroundColor.value.r}, ${backgroundColor.value.g}, ${backgroundColor.value.b}, ${backgroundColor.value.a ? backgroundColor.value.a / 100 : 1})`;
    const fontRgbaColor = `rgba(${fontColor.value.r}, ${fontColor.value.g}, ${fontColor.value.b}, ${fontColor.value.a ? fontColor.value.a / 100 : 1})`;
    props.onSubmit(`intro:${introText} -fontSize=${selectedFontSize} -backgroundColor=${backgroundRgbaColor} -fontColor=${fontRgbaColor} -animation=${selectedAnimation} -delayTime=${selectedDelayTime};`);
  };

  const introCompList = introTextList.value.map((text, index) => {
    return <div key={index} style={{display: "flex", padding: '0 0 6px 0'}}>
      <input value={text}
        onChange={(ev) => {
          const newValue = ev.target.value;
          const newList = cloneDeep(introTextList.value);
          newList[index] = newValue;
          introTextList.set(newList);
        }}
        onBlur={submit}
        className={styles.sayInput}
        placeholder={t('value.placeholder')}
        style={{width: "100%"}}
      />
      <div style={{padding: '0 0 0 8px'}}/>
      <DefaultButton onClick={() => {
        const newList = cloneDeep(introTextList.value);
        newList.splice(index, 1);
        introTextList.set(newList);
        submit();
      }}>{t('$common.delete')}</DefaultButton>
    </div>;
  });

  return <div>
    {introCompList}
    <DefaultButton style={{display: 'block', textAlign: 'left'}} onClick={() => {
      const newList = cloneDeep(introTextList.value);
      newList.push('');
      introTextList.set(newList);
      submit();
    }}>{t('add.button')}</DefaultButton>
    <DefaultButton onClick={toggleAccordion} styles={optionButtonStyles}>
      {t('option.title')}
    </DefaultButton>
    {isAccordionOpen && (
      <div>
        <div style={{ display: 'flex'}}>
          <CommonOptions title={t('font.size')}>
            <Dropdown
              options={fontSizes.map(f => ({key: f.key, text: f.text}))}
              selectedKey={fontSize.value}
              onChange={(event, item) => {
                item && fontSize.set(item.key as string);
                submit();
              }}
            />
          </CommonOptions>
          <CommonOptions title={t('font.animation')}>
            <Dropdown
              selectedKey={animation.value}
              options={animations.map(f => ({key: f.key, text: f.text}))}
              onChange={(ev, newValue: any) => {
                animation.set(newValue?.key?.toString() ?? "");
                submit();
              }}
            />
          </CommonOptions>
          <CommonOptions title={t('font.delayTime')}>
            <Dropdown
              selectedKey={delayTime.value}
              options={delayTimes.map(f => ({key: f.key, text: f.text}))}
              onChange={(ev, newValue: any) => {
                delayTime.set(newValue?.key?.toString() ?? "");
                submit();
              }}
            />
          </CommonOptions>
        </div>
        <div style={{ display: 'flex'}}>
          <CommonOptions title={t('colorPicker.backgroundColor')}>
            <ColorPicker
              color={localBackgroundColor}
              onChange={handleLocalBackgroundColorChange}
            />
          </CommonOptions>
          <CommonOptions title={t('colorPicker.fontColor')}>
            <ColorPicker
              color={localFontColor}
              onChange={handleLocalFontColorChange}
            />
          </CommonOptions>
        </div>
        <DefaultButton style={{ display: 'flex'}} onClick={handleSubmit}>{t('colorPicker.submit')}</DefaultButton>
      </div>
    )}
  </div>;
}
