<?php

/**
 * @file
 * Contains all admin pages, settings, and validate.
 */

/**
 * Settings form for menu callback
 */
function logout_check_settings() {
  $form = array();

  $form['logout_check_interval'] = array(
    '#type' => 'textfield',
    '#title' => t('Check frequency'),
    '#default_value' => variable_get('logout_check_interval', '5000'),
    '#size' => 10,
    '#maxlength' => 12,
    '#weight' => -8,
    '#description' => t('How often in ms should we check to see if the user is still logged in.'),
  );

  $form['logout_check_message_title']  = array(
    '#type' => 'textfield',
    '#title' => t('Title of message'),
    '#default_value' => variable_get('logout_check_message_title', 'You are no longer logged in!'),
    '#size' => 40,
    '#description' => t('This must be plain text as it might appear in a JavaScript confirm dialog.'),
  );

  $form['logout_check_message_body']  = array(
    '#type' => 'textarea',
    '#title' => t('Message to display in the dialog'),
    '#default_value' => variable_get('logout_check_message_body', 'Any information submitted on this form will not be saved.'),
    '#size' => 40,
    '#rows' => 2,
    '#description' => t('This message must be plain text as it might appear in a JavaScript confirm dialog.'),
  );

  return system_settings_form($form);
}

/**
 * Settings validation.
 */
// function logout_check_settings_validate($form, &$form_state) {
// }
