import React, {useState, useRef, useEffect} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
	View,
  TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const
export const buttonStyles = ["default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"] as const
export const iconPositions = ["top", "left", "right", "bottom"] as const

type Props = {
  onPress: (e: GestureResponderEvent) => any;
	type?: 'button' | 'submit' | 'reset';
  label?: string;	
	size?: typeof buttonSizes[number];
  buttonStyle?: typeof buttonStyles[number];
	title?: string;
	icon?: string;
	iconColor?: string;
	iconPosition?: typeof iconPositions[number];
};

const Button = ({onPress, buttonStyle = 'default', label, icon = '', iconColor, iconPosition = 'left'}: Props) => {

	// const computedIiconColor = (iconColor) ? `color: ${iconColor}` : styles[`${buttonType}Text`]
  const flexDirection = () => {
    switch (iconPosition) {
      case 'top':
        return 'column'
      case 'right': 
        return 'row-reverse'
      case 'bottom':
        return 'column-reverse'
      case 'left': 
        return 'row'
    }
  }

	const iconComponent = (
			<FontAwesomeIcon 
				icon={['fas', `${icon}`] as IconProp} 
				style={[styles[`${buttonStyle}Text`],
					{
						color: iconColor,
						marginTop: (iconPosition === 'bottom' && label) ? 6 : 0, 
						marginRight: (iconPosition === 'left' && label) ? 6 : 0, 
						marginBottom: (iconPosition === 'top' && label) ? 6 : 0,
						marginLeft: (iconPosition === 'right' && label) ? 6 : 0 
					}]
				} 
			/>
  );

  const textComponent = (
    <Text style={[styles.buttonText, buttonStyle && styles[`${buttonStyle}Text`]]}>
      {label}
    </Text>
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.primary, buttonStyle && styles[buttonStyle], {flexDirection: flexDirection()}]}>
      {
				!!icon && iconComponent
			}
      {
				!!label && textComponent
			}
    </TouchableOpacity>
  );
};

const styles: Record<string, any> = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 45,
    overflow: 'hidden',
  },
  buttonText: {
    fontFamily: 'Geomanist-Bold',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'center',
  },
  default: {
    backgroundColor: 'hsl(360, 100%, 100%)',
  },
  defaultText: {
    color: 'hsl(360, 0%, 0%)',
  },
  primary: {
    borderColor: 'hsl(211, 100%, 50%)',
    backgroundColor: 'hsl(211, 100%, 50%)',
  },
  primaryText: {
    color: 'hsl(0, 0%, 100%)',
  },
  secondary: {
    borderColor: 'hsl(208, 7%, 46%)',
    backgroundColor: 'hsl(208, 7%, 46%)'
  },
  secondaryText: {
    color: 'hsl(0, 0%, 100%)',
  },
  success: {
    borderColor: 'hsl(134, 61%, 41%)',
    backgroundColor: 'hsl(134, 61%, 41%)',
  },
  successText: {
    color: 'hsl(0, 0%, 100%)',
  },
  danger: {
    borderColor: 'hsl(354, 70%, 54%)',
    backgroundColor: 'hsl(354, 70%, 54%)',
  },
  dangerText: {
    color: 'hsl(0, 0%, 100%)',
  },
  warning: {
    borderColor: 'hsl(45, 100%, 51%)',
    backgroundColor: 'hsl(45, 100%, 51%)',
  },
  warningText: {
    color: 'hsl(210, 11%, 15%)',
  },
  info: {
    borderColor: 'hsl(188, 78%, 41%)',
    backgroundColor: 'hsl(188, 78%, 41%)',
  },
  infoText: {
    color: 'hsl(0, 0%, 100%)',
  },
  light: {
    borderColor: 'hsl(210, 17%, 98%)',
    backgroundColor: 'hsl(210, 17%, 98%)',
  },
  lightText: {
    color: 'hsl(210, 11%, 15%)',
  },
  dark: {
    borderColor: 'hsl(210, 10%, 23%)',
    backgroundColor: 'hsl(210, 10%, 23%)',
  },
  darkText: {
    color: 'hsl(0, 0%, 100%)',
  },
  link: {
    backgroundColor: 'transparent',
  },
  linkText: {
    fontWeight: '400',
    color: 'hsl(211, 100%, 50%)',
  }
});

export default Button;
