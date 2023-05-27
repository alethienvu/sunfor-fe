import routes from 'router/routes';

const navigation = () => {
  return routes.reduce((prev: any, curr: any) => {
    const { meta, path, name, children, redirect } = curr;
    if (meta && meta.icon && redirect!== '/404') {
      prev.push({
        name,
        href: path,
        icon: meta.icon,
        color: meta.color,
        title: meta.title,
        children: children,
        requiresAuth: meta.requiresAuth
      });
    }
    return prev;
  }, []);
};

export default navigation();
